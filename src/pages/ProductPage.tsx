import { useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { Product } from "../api/firebase";

export default function MainPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {}, []);

  return (
    <div className="container">
      <h1>MainPage</h1>
      <img src="" alt="" />
      <ul className="flex items-center justify-between flex-wrap  w-full">
        {products.map((product: Product) => (
          <li className="w-1/4    " key={product.id}>
            <img className="" src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
