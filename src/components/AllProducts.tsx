import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductItem from "./ProductItem";

export default function AllProducts() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <section className="container">
      <h2>전체 상품</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product}></ProductItem>
          ))}
      </ul>
      <></>
    </section>
  );
}
