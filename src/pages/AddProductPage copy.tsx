import React, { useState } from "react";
import uploadImage from "../api/uploader";
import { addNewProduct } from "../api/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../components/Type";

export default function AddProductPage() {
  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: null,
    image: "",
    options: [],
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState("");

  const queryClient = useQueryClient();
  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const selectedFile = files && files[0];
      setFile(selectedFile || null);
      console.log(selectedFile);
      return;
    }

    if (name === "options") {
      // 사용자가 콤마로 구분된 문자열을 배열로 변환
      const optionsArray = value.split(",").map((op) => op.trim());
      setProduct((product) => ({ ...product, [name]: optionsArray }));
    } else {
      setProduct((product) => ({ ...product, [name]: value }));
    }
    //옵션 문자열로 반환
    // setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    if (!file) {
      return;
    }
    // 제품 사진을 Cloudinary에 업로드하고 URL 획득
    uploadImage(file)
      .then((url) => {
        console.log(url);
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 등록되었습니다.");
              setTimeout(() => {
                setSuccess("");
              }, 2000);
            },
          }
        ); // mutation 실행

        // Firebase에 새로운 제품 추가
        // addNewProduct(product, url) //
        //   .then(() => {
        //     setSuccess("성공적으로 제품이 등록되었습니다.");
        //     setTimeout(() => {
        //       setSuccess("");
        //       navigate("/");
        //     }, 2000);
        //   });
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className="bg-white p-4 flex flex-col justify-center items-center">
      {success && (
        <h2 className="text-xl font-bold my-2 bg-lime-100 p-6 text-black border-2 border-lime-500 rounded-md absolute">
          ✅ {success}
        </h2>
      )}

      {file && (
        <img
          className="w-96 mx-auto mb-4"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-9/12 mx-auto flex flex-col items-center gap-2 justify-center"
      >
        <label className="block w-full my-8 bg-gray-100 rounded-xl">
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            onChange={handleChange}
            className="  block w-full  text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4 file:h-14
                          file:rounded-sm file:border-0
                          file:text-sm file:font-semibold
                          file:bg-violet-100 file:text-violet-500
                          hover:file:bg-violet-100 
                          rounded-xl
                        "
          />
        </label>
        <div className="relative z-0 w-full mb-6 group">
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={product.title ?? ""}
              onChange={handleChange}
              type="text"
              name="title"
              id="floating_title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none outline-none peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              상품명
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={product.price ?? ""}
              onChange={handleChange}
              type="number"
              name="price"
              id="floating_price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              가격
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={product.options ?? ""}
              onChange={handleChange}
              type="text"
              name="options"
              id="floating_option"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  peer text-center"
              placeholder="옵션들(콤마(,)로 구분)"
              required
            />
            <label
              htmlFor="floating_option"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              옵션
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              value={product.description ?? ""}
              onChange={handleChange}
              name="description"
              id="floating_detail"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  peer text-center"
              placeholder=""
              required
            />
            <label
              htmlFor="floating_detail"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              상세정보
            </label>
          </div>
          <button
            disabled={isUploading}
            type="submit"
            className=" text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-ml w-full  px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            {isUploading ? "업로드중.." : "제품 등록"}
          </button>
        </div>
      </form>
    </section>
  );
}
