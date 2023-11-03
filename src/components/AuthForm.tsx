import React from "react";

export default function AuthForm() {
  return (
    <div className="flex-col">
      <form action="">
        <input type="text" placeholder="name" />
        <input type="text" placeholder="id" />
        <input type="password" placeholder="pw" />
      </form>
    </div>
  );
}
