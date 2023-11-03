import { useState } from "react";
// import AuthForm from "../components/AuthForm";
import { auth } from "../api/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function JoinPage() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "current-password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log(userName, email, password);

    if (isLoading || email === "" || password === "" || userName === "") {
      return;
    }
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: userName });
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code, err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Join!</h1>

      <form className="flex-col" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={userName}
          onChange={handleChange}
          placeholder="name"
        />
        <input
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          name="current-password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="password"
          autoComplete="current-password"
        />
        <p> {error}</p>
        {error !== "" ? <p>{error}</p> : null}
        <input type="submit" value={isLoading ? "로딩중..." : "회원가입"} />
      </form>
    </div>
  );
}
