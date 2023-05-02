import { Price } from "@/types/types";

export function getPriceLocale(currency: string) {
  switch (currency) {
    case "ARS":
      return "es-UY";

    default:
      break;
  }
}

export function getPrintablePrice(price: Price) {
  return (
    "$ " +
    (price.amount + price.decimals).toLocaleString(
      getPriceLocale(price.currency)
    )
  );
}
