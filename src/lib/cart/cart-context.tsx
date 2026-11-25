"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, Money, Product } from "@/lib/commerce/types";
import { cartTotal } from "@/lib/commerce/money";
import { products } from "@/data/products";

const STORAGE_KEY = "wellford.cart.v1";
const MAX_QTY = 10;

type State = { lines: CartLine[] };
type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; id: string }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "clear" };

const clampQty = (q: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(q) || 1));

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const existing = state.lines.find((l) => l.id === action.line.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === action.line.id ? { ...l, quantity: clampQty(l.quantity + action.line.quantity) } : l,
          ),
        };
      }
      return { lines: [...state.lines, { ...action.line, quantity: clampQty(action.line.quantity) }] };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.id !== action.id) };
    case "setQuantity":
      return {
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, quantity: clampQty(action.quantity) } : l)),
      };
    case "clear":
      return { lines: [] };
  }
}

/**
 * Saved lines carry a price snapshot. Re-price them from the current
 * catalogue on load so stored bags never show stale or missing prices, and
 * drop lines whose product no longer exists.
 * (With Shopify, the Cart API returns current prices instead.)
 */
function reprice(lines: CartLine[]): CartLine[] {
  return lines.flatMap((l) => {
    const product = products.find((p) => p.id === l.productId);
    return product ? [{ ...l, price: product.price }] : [];
  });
}

function isCartLine(v: unknown): v is CartLine {
  if (!v || typeof v !== "object") return false;
  const l = v as Record<string, unknown>;
  return typeof l.id === "string" && typeof l.handle === "string" && typeof l.size === "string" && typeof l.quantity === "number";
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  total: Money | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, quantity: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  maxQuantity: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Restore from localStorage after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: reprice(parsed.filter(isCartLine)) });
      }
    } catch {
      /* corrupted storage: start with an empty cart */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      /* storage full or unavailable */
    }
  }, [state.lines, hydrated]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed: unknown = e.newValue ? JSON.parse(e.newValue) : [];
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: reprice(parsed.filter(isCartLine)) });
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((product: Product, size: string, quantity: number) => {
    dispatch({
      type: "add",
      line: {
        id: `${product.id}::${size}`,
        productId: product.id,
        handle: product.handle,
        title: product.title,
        image: product.images.find((i) => i.kind === "cutout") ?? product.images[0],
        size,
        quantity,
        price: product.price,
      },
    });
    setIsOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      itemCount: state.lines.reduce((n, l) => n + l.quantity, 0),
      total: cartTotal(state.lines),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (id) => dispatch({ type: "remove", id }),
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      maxQuantity: MAX_QTY,
    }),
    [state.lines, isOpen, addItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
