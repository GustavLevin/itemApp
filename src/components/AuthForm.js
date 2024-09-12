"use client";  // Ensure this component is client-side

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";  // Assuming you have a context set up for authentication

export default function AuthForm() {
  const router = useRouter();
  const auth = useAuth();  // Access authentication context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");  // Clear previous errors

    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Token received:", data.token);
        localStorage.setItem("token", data.token);  // Store JWT in localStorage
        auth.setToken(data.token);  // Set token in context
        router.push("/items");  // Redirect to items page
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.error || "Invalid login credentials");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      setError("Something went wrong, please try again.");
    }
  }

  return (
    <div>
      <form className="form bg-white" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button className="form__button form__button--primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="form__text">...or</p>
        <div className="form__group">
          <button
            className="form__button form__button--secondary"
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}