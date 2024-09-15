"use client";  

import React, { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";  

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter();  

  const logout = () => {
    setToken(null);  
    localStorage.removeItem("token");  
    router.push("/");  
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