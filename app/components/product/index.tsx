import Image from "next/image";

import { priceFormat } from "@/utils";

import { ProductProps } from "./types";

export default function Product({ name, price, image }: ProductProps) {
  return (
    <div className="text-gray-700">
      <Image
        src={image}
        width={400}
        height={400}
        objectFit="cover"
        alt="product image"
        className="rounded-lg overflow-hidden"
      />
      <div className="font-medium mt-2">
        <h2>{name}</h2>
        {price && (
          <p className="text-sm text-green-600">{priceFormat(price)}</p>
        )}
      </div>
    </div>
  );
}
