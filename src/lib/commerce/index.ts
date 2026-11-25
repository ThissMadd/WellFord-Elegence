import { localProvider } from "./local-provider";
import type { CommerceProvider } from "./types";

/**
 * The active commerce backend.
 *
 * To connect Shopify later, implement `CommerceProvider` with the Storefront
 * API (e.g. src/lib/commerce/shopify-provider.ts) and switch it here. Pages
 * and components only ever talk to this object.
 */
export const commerce: CommerceProvider = localProvider;

export * from "./types";
export { formatMoney, lineTotal, cartTotal } from "./money";
