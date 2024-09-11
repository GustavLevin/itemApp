// import { useState } from "react";

// export default function Register() {
//   const [formData, setFormData] = useState({ email: "", password: "", name: "" });
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         localStorage.setItem("token", data.token);  // Store JWT in localStorage
//         setMessage("Registration successful!");
//       } else {
//         setMessage(data.message || "Registration failed.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
//         <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
//         <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
//         <button type="submit">Register</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }