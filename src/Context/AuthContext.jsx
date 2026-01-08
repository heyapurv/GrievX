import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    try {
      const res = await fetch(`${API}/api/v1/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        return null;
      }
      const data = await res.json();
      setUser(data.user || null);
      return data.user || null;
    } catch (err) {
      setUser(null);
      return null;
    }
  }

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch(`${API}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return null;
      // server sets httpOnly cookie; now fetch user
      return await fetchMe();
    } catch (err) {
      return null;
    }
  }

  async function register(payload) {
    try {
      const res = await fetch(`${API}/api/v1/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) return false;
      await fetchMe();
      return true;
    } catch (err) {
      return false;
    }
  }

  async function logout() {
    try {
      await fetch(`${API}/api/v1/logout`, {
        credentials: "include",
      });
    } catch (err) {
      // ignore
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
