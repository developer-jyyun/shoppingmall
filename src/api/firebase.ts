import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// import { User } from "firebase/auth"; // Firebase의 User 타입을 가져옴
import { User as FirebaseUser } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as uuid } from "uuid";
import { Product } from "../components/Type";

interface User extends FirebaseUser {
  isAdmin: boolean;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function googleLogin() {
  return signInWithPopup(auth, provider).catch((error) => {
    console.error(error);
  });
}

export function googleLogout() {
  return signOut(auth).catch((error) => {
    console.error(error);
  });
}

export function onUserStateChange(callback: (user: User | null) => void) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // adminUser 함수가 프로미스를 반환하므로 await를 사용
      const updatedUser = await adminUser(user);
      callback(updatedUser);
    } else {
      callback(null); // 사용자가 로그아웃한 경우 null을 전달
    }
  });
}

async function adminUser(user: User): Promise<User | null> {
  try {
    const snapshot = await get(ref(database, "admins"));
    if (snapshot.exists()) {
      const admins = snapshot.val();
      console.log("admins:", admins);

      const isAdmin = admins.includes(user.uid);

      // user 객체에 isAdmin 속성을 추가하고 반환
      return { ...user, isAdmin };
    } else {
      // 어드민 정보가 없을 경우 isAdmin을 false로 설정
      return { ...user, isAdmin: false };
    }
  } catch (error) {
    console.error("Error in adminUser:", error);
    return user;
  }
}

export async function addNewProduct(
  product: Product,
  imageURL: string
): Promise<void> {
  const id: string = uuid();
  // parseFloat 함수를 사용하여 product.price를 number로 변환
  const price: number = Number(product.price);
  // "옵션" 필드가 없을 때 기본값으로 빈 배열 사용
  const optionsArray = product.options || [];

  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    title: product.title,
    price: price,
    image: imageURL,
    options: optionsArray,
    // options: product.options.split(","),
    description: product.description,
  });
  console.log("업로드완료😀");
}

export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return Object.values(snapshot.val()); //snapshot 객체에서 key 제외한 value값만 가져옴
    } else {
      console.log("No data available");
      return [];
    }
  });
}

export async function getCart(userId: string) {
  return get(ref(database, `cart/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      console.log("🛒 아이템", items);
      return Object.values(items);
    });
}

export async function removeFromCart(userId: string, productId: string) {
  return remove(ref(database, `cart/${userId}/${productId}`));
}

// 기존코드 : 같은 상품의 다른 옵션 선택 시 덮어쓰기 문제 발생
export async function addOrUpdateToCart(userId: string, product: Product) {
  return set(ref(database, `cart/${userId}/${product.id}`), product);
}

//다른 옵션 선택 시 새로운 id 생성해서 추가
/*
// DatabaseReference 타입 정의
type CartRef = DatabaseReference;

 export async function addOrUpdateToCart(userId: string, product: Product) {
  const cartRef: CartRef = ref(database, `cart/${userId}`);
  const snapshot = await get(cartRef);
  const cartData = snapshot.val() || {};

  const existingItem = cartData[product.id];
  if (existingItem) {
    // 이미 카트에 상품이 있는 경우, 동일 ID의 다른 옵션을 추가
    const newItem = {
      ...product,
      option: product.option,
    };
    // 고유한 키(예: UUID)를 생성하여 기존 항목과 구분
    const uniqueKey = uuid();
    cartData[product.id + uniqueKey] = newItem;

    // 업데이트된 카트 데이터를 저장
    return set(cartRef, cartData);

    // 데이터와 참조를 함께 set 함수에 전달
    return set(cartRef, cartData).then(() => {
      // 업데이트가 완료되면 무엇을 할지 여기에 추가 가능
    });
  } else {
    // 카트에 상품이 없는 경우, 새로운 항목으로 추가
    return set(ref(database, `cart/${userId}/${product.id}`), product);
    // return set(ref(cartRef, product.id), product).then(() => {
    //   // 추가가 완료되면 무엇을 할지 여기에 추가 가능
    // });
  }
} */
