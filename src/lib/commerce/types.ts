/**
 * Commerce domain types.
 *
 * Shapes intentionally mirror the Shopify Storefront API (Product, MoneyV2,
 * ProductVariant, Collection) so a Shopify provider can be dropped in later
 * without touching presentation components.
 */

export type Money = {
  /** Decimal string, as Shopify returns it, e.g. "295.00". */
  amount: string;
  currencyCode: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "cutout" = transparent product render, "lifestyle" = editorial photo. */
  kind: "cutout" | "lifestyle" | "scene";
};

export type ProductOption = {
  name: "Size";
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  /** Short line used on listings, e.g. "Brown leather penny loafer". */
  subtitle: string;
  description: string[];
  /** Null until a price is confirmed. The UI never invents one. */
  price: Money | null;
  collections: CollectionHandle[];
  images: ProductImage[];
  options: ProductOption[];
  /** True when sizes still need confirming by the business. */
  sizesProvisional: boolean;
  tags: string[];

  // Optional merchandising fields. Each maps onto Shopify: productType,
  // variant SKU / selectedOptions, and product metafields or SEO.
  /** Product category, e.g. "Boots" (Shopify: productType). */
  category?: string;
  /** Colour name (Shopify: a "Color" option or metafield). */
  color?: string;
  /** Stock keeping unit (Shopify: variant.sku). */
  sku?: string;
  /** Small label shown on cards and the product page, e.g. "New Arrival". */
  badge?: string;
  /** One-line summary shown under the product title. */
  shortDescription?: string;
  /** Design details listed on the product page. */
  details?: string[];
  /** Overrides for the page <title> and meta description (Shopify: product.seo). */
  seo?: { title: string; description: string };
};

export type CollectionHandle = "loafers" | "lace-ups" | "new-arrivals";

export type Collection = {
  handle: CollectionHandle;
  title: string;
  description: string;
};

export type CartLine = {
  /** Stable key: product id + selected size. */
  id: string;
  productId: string;
  handle: string;
  title: string;
  image: ProductImage;
  size: string;
  quantity: number;
  price: Money | null;
};

/** The contract any commerce backend (local data, Shopify, …) must satisfy. */
export interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  /** Products in the given order (unknown handles are skipped). */
  getProductsByHandles(handles: string[]): Promise<Product[]>;
  getCollection(handle: string): Promise<Collection | null>;
  getCollectionProducts(handle: CollectionHandle): Promise<Product[]>;
  getRelatedProducts(product: Product, limit?: number): Promise<Product[]>;
}
