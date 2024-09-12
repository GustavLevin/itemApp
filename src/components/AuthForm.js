"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";  // Ensure correct path

export default function AuthForm() {
  const router = useRouter();
  const { setToken } = useAuth();  // Ensure `useAuth()` provides `setToken`
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
        setToken(data.token);  // Set token in context
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
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isLogin ? "Login" : "Register"}</h2>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <button className="form-button primary">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="toggle-text">...or</p>
        <button
          className="form-button secondary"
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </form>
      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ececec, #ffffff);
          padding: 20px;
        }

        .auth-form {
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .form-title {
          font-size: 24px;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-label {
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
          color: #555;
        }

        .form-input {
          width: 100%;
          padding: 12px 15px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .form-input:focus {
          border-color: #0070f3;
          outline: none;
        }

        .form-button {
          width: 100%;
          padding: 12px 15px;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .form-button.primary {
          background-color: #0070f3;
          color: #fff;
          border: none;
        }

        .form-button.primary:hover {
          background-color: #005bb5;
        }

        .form-button.secondary {
          background-color: #fff;
          color: #0070f3;
          border: 1px solid #0070f3;
          margin-top: 10px;
        }

        .form-button.secondary:hover {
          background-color: #f0f0f0;
        }

        .toggle-text {
          margin: 20px 0;
          color: #666;
        }

        .error-message {
          color: red;
          margin-bottom: 20px;
          font-size: 14px;
        }

        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .auth-container {
            background: linear-gradient(135deg, #333, #444);
          }

          .auth-form {
            background-color: #222;
            color: #f7f7f7;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
          }

          .form-title {
            color: #f7f7f7;
          }

          .form-label {
            color: #ddd;
          }

          .form-input {
            background-color: #333;
            border: 1px solid #555;
            color: #f7f7f7;
          }

          .form-input:focus {
            border-color: #1e90ff;
          }

          .form-button.primary {
            background-color: #1e90ff;
            border: none;
          }

          .form-button.primary:hover {
            background-color: #0070f3;
          }

          .form-button.secondary {
            background-color: #333;
            color: #1e90ff;
            border: 1px solid #1e90ff;
          }

          .form-button.secondary:hover {
            background-color: #444;
          }

          .toggle-text {
            color: #bbb;
          }

          .error-message {
            color: #ff6b6b;
          }
        }
      `}</style>
    </div>
  );
}