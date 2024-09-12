import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);  // Ensure `setToken` is defined

  return (
    <AuthContext.Provider value={{ token, setToken }}>  // Provide `setToken` in context
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}