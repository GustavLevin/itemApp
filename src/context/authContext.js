// "use client";  // Add this line at the top

// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

"use client";  

import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";  // Import useRouter for navigation

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter();  // Initialize the router

  const logout = () => {
    setToken(null);  // Clear the token
    localStorage.removeItem("token");  // Remove the token from localStorage
    router.push("/");  // Redirect to the start page
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}