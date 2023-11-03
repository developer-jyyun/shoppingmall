// import { useState } from "react";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartItem({ cartItem, uid }) {
  const { id, image, title, price, option, quantity } = cartItem;

  const handlePlus = () => {
    addOrUpdateToCart(uid, { ...cartItem, quantity: quantity + 1 });
  };
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...cartItem, quantity: quantity - 1 });
  };
  const handleDelete = () => {
    removeFromCart(uid, id);
  };
  return (
    <li className="flex items-center justify-between w-full border border-gray-300 rounded-lg mb-4  overflow-hidden">
      <div className="w-1/6">
        <img className="w-full" src={image} alt={cartItem.title} />
      </div>
      <div className="w-full flex items-center justify-between px-10">
        <div>
          <h3 className="font-bold"> {title}</h3>
          <p> 사이즈: {option}</p>
        </div>
        <p>
          수량: <button onClick={handlePlus}>➕</button>
          {quantity}
          <button onClick={handleMinus}>➖</button>
        </p>
        <p> {price}원</p>
        <RiDeleteBin6Line
          onClick={handleDelete}
          className="transition-all hover:text-brand hover:first-letter:scale-105"
        />
      </div>
    </li>
  );
}
