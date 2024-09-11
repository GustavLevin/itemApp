// import { useState } from "react";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("token", data.token);  // Store JWT in localStorage
//         setMessage("Login successful!");
//       } else {
//         setMessage(data.message || "Login failed.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//         <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
//         <button type="submit">Login</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }