import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./Type";

interface ProductItemProps {
  product: Product;
}
// export default function ProductItem({product , product: { id, image, title, price } }) {
export default function ProductItem({ product }: ProductItemProps) {
  const { id, image, title, price, options, description } = product;
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md shadow-black overflow-hidden cursor-pointer p-4 bg-white transition-all hover:scale-105"
    >
      <div className="h-80  overflow-hidden">
        <img className="w-full " src={image} alt={title} />
      </div>
      <div className="mt-2 px-2 text-lg flex flex-col items-start justify-center text-black">
        <h3 className="font-bold">{title}</h3>
        <p className="mb-2">₩{price}</p>
      </div>
    </li>
  );
}
