import { CURRENCY_CODE, CURRENCY_LOCALE } from "@/constants/currency";

export function formatPrice(value: number, currency = CURRENCY_CODE) {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(value);
}
