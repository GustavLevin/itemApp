"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";  // Import router for redirection

export default function HomePage() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();  // Initialize router

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);  // Store JWT in localStorage
        setMessage("Registration successful!");
        router.push("/items");  // Redirect to /items after successful registration
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);  // Store JWT in localStorage
        setMessage("Login successful!");
        router.push("/items");  // Redirect to /items after successful login
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Inventory Management App</h2>
      <div className="form-container">
        {/* Registration Form */}
        <div className="form-section">
          <h3>Register</h3>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit" className="button">Register</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-section">
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
      {message && <p className="message">{message}</p>}

      {/* Styles for light/dark mode and form layout */}
      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          border-radius: 10px;
          background-color: var(--background-color, #f7f7f7);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          color: var(--text-color, #000);
        }
        h2, h3 {
          color: var(--text-color, #000);
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-section {
          background-color: var(--section-background, #fff);
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          background-color: var(--input-background, #fff);
          color: var(--input-text-color, #000);
        }
        input::placeholder {
          color: var(--input-placeholder-color, #888);
        }
        .button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .message {
          margin-top: 20px;
          color: var(--message-color, #0070f3);
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --background-color: #333;
            --text-color: #f7f7f7;
            --section-background: #444;
            --input-background: #555;
            --input-text-color: #f7f7f7;
            --input-placeholder-color: #aaa;
            --message-color: #1e90ff;
          }
        }
      `}</style>
    </div>
  );
}