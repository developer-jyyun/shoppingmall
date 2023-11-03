import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/styled/Button";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart } from "../api/firebase";

export default function DetailPage() {
  const { user } = useAuthContext();
  const {
    state: {
      product: { id, image, title, price, options, description },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const [message, setMessage] = useState("");
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleAddToCart = () => {
    if (user) {
      // 사용자가 로그인한 경우에만 uid를 사용
      const { uid } = user;
      const cartProducts = {
        id,
        image,
        title,
        price,
        option: selected,
        quantity: 1,
      };
      addOrUpdateToCart(uid, cartProducts);
      console.log("🛒추가완료!", cartProducts);
      setMessage("장바구니에 추가되었습니다🐻");
    } else {
      // 사용자가 로그인하지 않은 경우
      setMessage(" ❗❗ 로그인이 필요합니다 ❗❗");
    }
  };
  return (
    <section className="flex justify-center items-center gap-40 p-4">
      <div className="w-1/2">
        <img src={image} alt={title} />
      </div>
      <div className="w-1/2 flex flex-col  gap-6">
        <h2 className="font-bold text-3xl">{title}</h2>
        <h3 className="font-bold text-xl">₩ {price}</h3>

        <hr />
        <p>
          <b>상품 설명</b> <br />
          {description}
        </p>

        <label htmlFor="select">
          사이즈 &nbsp;&nbsp;
          {options ? (
            <select
              onChange={handleSelect}
              value={selected}
              className=" px-4 py-2 flex-1 border-2 border-solid rounded-md border-brand outline-none"
              id="select"
            >
              {options.map((ops, index) => (
                <option key={index} value={ops}>
                  {ops}
                </option>
              ))}
            </select>
          ) : (
            <span>No options available</span>
          )}
        </label>
        <Button text={" 장바구니에 추가 🛒"} onClick={handleAddToCart} />
        <p className="font-bold text-center"> {message}</p>
      </div>
    </section>
  );
}
