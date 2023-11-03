import { createContext, useContext, useEffect, useState } from "react";
import { googleLogin, googleLogout, onUserStateChange } from "../api/firebase";
import { User as FirebaseUser } from "firebase/auth";

interface User extends FirebaseUser {
  isAdmin: boolean;
}
const AuthContext = createContext<any>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onUserStateChange((userData: User | null) => {
      console.log("유저정보", userData);
      setUser(userData);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, googleLogin, googleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

// export function useAuthContext() {
//   const context = useContext(AuthContext);

//   // 사용자가 로그인하지 않은 경우, 기본 사용자 정보를 생성
//   if (!context.user) {
//     return {
//       user: null,
//       googleLogin: context.googleLogin,
//       googleLogout: context.googleLogout,
//     };
//   }

//   return context;
// }
