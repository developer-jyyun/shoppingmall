import { useState, useEffect } from "react";
import AllProducts from "../components/AllProducts";
import Banner from "../components/Banner";

export default function MainPage() {
  useEffect(() => {}, []);

  return (
    <main className="container">
      <Banner />
      <AllProducts />
    </main>
  );
}
