"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultState);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(defaultState.token);

  useEffect(() => {
    const _token = localStorage.getItem("@library/token");

    if (_token) {
      setToken(_token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("@library/token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };