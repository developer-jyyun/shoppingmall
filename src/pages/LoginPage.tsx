import { useState } from "react";
import AuthForm from "../components/AuthForm";

import { auth } from "../api/firebase";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === email) {
      setEmail(value);
    } else if (password === password) {
      setPassword(value);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === null || password === null || isLoaidng) {
      //null
      return;
    }
  };

  return (
    <div>
      <h1>Login!</h1>
      <div>
        <form className="flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            value={userName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="pw"
            value={password}
            onChange={handleChange}
          />
          <input type="submit" value="login" />
        </form>
      </div>
    </div>
  );
}
