import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     LOAD USER ON APP START
  ============================== */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth/me");

        if (res?.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("AUTH LOAD ERROR:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* ===============================
     LOGIN
  ============================== */
  const login = (userData) => {
    setUser(userData);
  };

  /* ===============================
     LOGOUT
  ============================== */
  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("LOGOUT ERROR:", error.response?.data || error.message);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};