import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const verifyStoredToken = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        const response = await authService.verify();
        const userData = response.data;

        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(userData);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProviderWrapper };
