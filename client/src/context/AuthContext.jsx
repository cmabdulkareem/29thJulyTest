import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/user`, { withCredentials: true })
      .then((res) => {
        const { user, role } = res.data;
        setUser(user);
        setIsLoggedIn(true);
        setIsAdmin(role === "admin");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        logout();
      });
  }, []);

  function updateUser(userData) {
    setUser(userData);
  }

  function login(role) {
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");
    setLoading(false);
  }

  function logout() {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        loading,
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
