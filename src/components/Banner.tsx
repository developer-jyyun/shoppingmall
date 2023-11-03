import React from "react";

export default function Banner() {
  return (
    <section className="bg-[#0f100b] h-[36rem] relative ">
      <div className="h-full bg-contain bg-no-repeat bg-banner bg-center"></div>
      <div className="absolute w-full top-12 left-12 text-left text-gray-50 drop-shadow-2xl">
        <h2 className="text-4xl font-bold mb-10">My Bears🐻✨</h2>
        <p className="text-2xl">당신의 반려 곰도리를 찾아보세요😊💖</p>
      </div>
    </section>
  );
}
