import Stripe from "stripe";
import { Inter } from "next/font/google";

import Product from "./components/product";

const inter = Inter({ subsets: ["latin"] });

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });
  const products = await stripe.products.list();
  const productsWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        image: product.images[0],
        currency: prices.data[0].currency,
        price: prices.data[0].unit_amount,
      };
    })
  );
  return productsWithPrices;
};

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="grid grid-cols-fluid gap-6">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
