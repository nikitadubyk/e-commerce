export const priceFormat = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount / 100);
