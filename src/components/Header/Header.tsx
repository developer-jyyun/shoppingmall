import { Link } from "react-router-dom";

import { RiBearSmileFill, RiBearSmileLine, RiAddBoxLine } from "react-icons/ri";
import UserInfo from "./UserInfo";

import Button from "../styled/Button";
import { useAuthContext } from "../../context/AuthContext";
import CartStatus from "../CartStatus";

export default function Header() {
  const { user, googleLogin, googleLogout } = useAuthContext();
  return (
    <header className="flex justify-between p-4 border-b border-gray-300">
      <Link to="/">
        <h1 className="flex items-center gap-4 text-brand text-4xl font-bold shrink-0">
          <RiBearSmileFill /> My Bears
        </h1>
      </Link>
      <nav className="flex items-center gap-5 font-bold">
        <Link to="/products" className="flex gap-1 items-center">
          <RiBearSmileLine className="text-3xl" />
          <span className="text-base">Products</span>
        </Link>
        {user && (
          <Link to="/cart" className="flex gap-2 items-center">
            <CartStatus /> Cart
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/add" className="flex gap-1 items-center">
            <RiAddBoxLine className="text-3xl" />
          </Link>
        )}

        {user && <UserInfo user={user} />}
        {user ? (
          <Button text={"로그아웃"} onClick={googleLogout} />
        ) : (
          <Button text={"로그인"} onClick={googleLogin} />
        )}
      </nav>
    </header>
  );
}
