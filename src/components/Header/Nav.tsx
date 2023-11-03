import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const handleLoginClick = () => {};
  return (
    <nav>
      <Link to="/products">products</Link>
      <Link to="/cart">cart</Link>

      <button onClick={handleLoginClick}>login</button>
    </nav>
  );
}
