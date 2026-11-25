"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { brand } from "@/config/brand";
import { clientCareNav, primaryNav } from "@/data/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { useDialog } from "@/lib/use-dialog";
import clsx from "@/lib/clsx";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useDialog<HTMLDivElement>(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-lux",
          scrolled
            ? "border-b border-gold/15 bg-ink-deep/75 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5 md:py-7",
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-14 max-md:grid max-md:grid-cols-[2.75rem_1fr_2.75rem] max-md:px-[max(0.75rem,env(safe-area-inset-left))]">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 place-items-center text-ivory md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} strokeWidth={1.2} />
          </button>

          <Link
            href="/"
            className="max-md:justify-self-center text-[clamp(1.3rem,6vw,1.55rem)] font-medium uppercase leading-none tracking-[0.2em] text-ivory text-shadow-soft sm:text-[1.9rem] md:max-lg:text-[1.55rem] lg:text-[2.1rem]"
            aria-label={`${brand.name} — home`}
          >
            {brand.name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center md:flex">
            <ul className="flex items-center">
              {primaryNav.map((item, i) => (
                <Fragment key={item.href}>
                  {i > 0 && (
                    <li aria-hidden className="px-2.5 text-[0.75rem] text-ivory/55 lg:px-4 xl:px-6">
                      /
                    </li>
                  )}
                  <li>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="label link-underline whitespace-nowrap text-[0.74rem] text-ivory/90 text-shadow-soft transition-colors duration-500 hover:text-ivory max-lg:text-[0.66rem] max-lg:tracking-[0.16em] lg:max-xl:tracking-[0.22em]"
                    >
                      {item.label}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
            <BagButton count={itemCount} onClick={openCart} className="ml-5 lg:ml-8 xl:ml-10" />
          </nav>

          <BagButton count={itemCount} onClick={openCart} className="grid h-11 w-11 place-items-center md:hidden" />
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={clsx(
          "fixed inset-0 z-50 flex flex-col bg-ink-deep transition-[opacity,visibility] duration-500 ease-out will-change-[opacity] md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center px-[max(0.75rem,env(safe-area-inset-left))] py-5">
          <button type="button" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
            <X size={26} strokeWidth={1.1} />
          </button>
          <span className="justify-self-center text-[clamp(1.3rem,6vw,1.55rem)] font-medium uppercase leading-none tracking-[0.2em]">{brand.name}</span>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center overflow-y-auto px-7 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul className="space-y-1">
            {primaryNav.map((item, i) => (
              <li
                key={item.href}
                className={clsx("transition-all duration-700 ease-lux", menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
                style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="block py-3 text-[clamp(1.8rem,8.5vw,2.2rem)] font-medium leading-none text-ivory transition-colors duration-500 aria-[current=page]:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="gold-rule gold-rule--left mt-10" aria-hidden />
          <ul className="mt-6 grid grid-cols-2 gap-x-6">
            {clientCareNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="label block py-3 text-[0.68rem] tracking-[0.22em] text-ivory/70">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="italic-note mt-6 text-[1.05rem]">
            {brand.tagline[0]} {brand.tagline[1]}
          </p>
        </nav>
      </div>
    </>
  );
}

function BagButton({ count, onClick, className }: { count: number; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("relative p-1 text-ivory/90 transition-colors duration-500 hover:text-gold", className)}
      aria-label={count ? `Shopping bag, ${count} item${count === 1 ? "" : "s"}` : "Shopping bag, empty"}
    >
      <ShoppingBag size={19} strokeWidth={1.15} />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -right-1.5 -top-1 max-md:right-1 max-md:top-1.5 min-w-[1.05rem] rounded-full bg-gold px-1 text-center text-[0.62rem] font-bold leading-[1.05rem] text-ink-deep"
        >
          {count}
        </span>
      )}
    </button>
  );
}
