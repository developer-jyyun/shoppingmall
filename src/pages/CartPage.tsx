import React from "react";
import { getCart } from "../api/firebase";
import Loading from "../components/Loading";
import CartItem from "../components/CartItem";
import { useAuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import PriceCard from "../components/PriceCard";
import { RiAddCircleFill, RiEqualFill } from "react-icons/ri";
import Button from "../components/styled/Button";
import { Product } from "../components/Type";

const DELIVERY_FEE = 3000;
export default function CartPage() {
  const {
    user: { uid },
  } = useAuthContext();

  const { isLoading, data: cartItemData } = useQuery({
    queryKey: ["cart", uid],
    queryFn: () => getCart(uid),
  });
  if (isLoading) {
    return <Loading />;
  }

  const hasCartItem = cartItemData && cartItemData.length > 0;
  const totalPrice =
    cartItemData &&
    cartItemData.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className="container pb-8">
      <h2>나의 장바구니</h2>
      {!hasCartItem && (
        <p>
          장바구니에 담긴 상품이 없습니다.
          <br /> 나만의 곰돌이를 찾아보세요!
        </p>
      )}

      {hasCartItem && (
        <ul>
          {cartItemData &&
            cartItemData.map((item) => (
              <CartItem key={item.id} cartItem={item} uid={uid} />
            ))}
        </ul>
      )}
      <div className="flex justify-between items-center w-full mb-8">
        <PriceCard text="상품 총액" price={totalPrice} />
        <RiAddCircleFill className="shrink-0 text-2xl" />
        <PriceCard text="배송비" price={DELIVERY_FEE} />
        <RiEqualFill className="shrink-0 text-2xl" />
        <PriceCard text="결제 금액" price={totalPrice + 3000} />
      </div>
      <Button
        text="주문하기"
        onClick={() => {
          alert("준비중입니다!");
        }}
      ></Button>
    </section>
  );
}
