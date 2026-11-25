import { collections, products } from "@/data/products";
import type { CollectionHandle, CommerceProvider, Product } from "./types";

/** Commerce provider backed by the local catalogue in src/data/products.ts. */
export const localProvider: CommerceProvider = {
  async getProducts() {
    return products;
  },
  async getProduct(handle) {
    return products.find((p) => p.handle === handle) ?? null;
  },
  async getProductsByHandles(handles) {
    return handles.flatMap((h) => products.find((p) => p.handle === h) ?? []);
  },
  async getCollection(handle) {
    return collections.find((c) => c.handle === handle) ?? null;
  },
  async getCollectionProducts(handle: CollectionHandle) {
    return products.filter((p) => p.collections.includes(handle));
  },
  async getRelatedProducts(product: Product, limit = 3) {
    return products.filter((p) => p.id !== product.id).slice(0, limit);
  },
};
