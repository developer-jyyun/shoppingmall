import { RiShoppingCart2Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function CartStatus() {
  const {
    user: { uid },
  } = useAuthContext();
  const { data: cartItemData } = useQuery({
    queryKey: ["cart", uid],
    queryFn: () => getCart(uid),
  });

  //   카트 추가 즉시 뱃지 업데이트 되도록 수정해야 함!
  return (
    <div className="relative">
      <RiShoppingCart2Line className="text-3xl" />
      {cartItemData && (
        <p className="w-6 h-6 text-center bg-sub text-white font-bold rounded-full absolute -top-2 left-4">
          {cartItemData.length}
        </p>
      )}
    </div>
  );
}
