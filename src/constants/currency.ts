/**
 * Single source of truth for site-wide currency formatting.
 * Flip `CURRENCY_CODE`/`CURRENCY_LOCALE` here to change the currency
 * everywhere `formatPrice` is used. Catalog prices in `motorcycles.ts`
 * are mock figures, not live quotes — switching currency here does not
 * convert them, it only changes how they're formatted.
 */
export const CURRENCY_CODE = "USD";
export const CURRENCY_LOCALE = "en-US";
