// oxlint-disable react/only-export-components
import { createContext, useContext, useMemo, useState } from 'react';

const ADMIN_EMAIL = 'example123@gmail.com';

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const saved = localStorage.getItem('resumex_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    localStorage.removeItem('resumex_user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem('resumex_token', token);
    }

    // Automatically determine role based on email
    const userWithRole = {
      ...userData,
      role: userData.role || (userData.email === ADMIN_EMAIL ? 'admin' : 'user'),
    };

    localStorage.setItem('resumex_user', JSON.stringify(userWithRole));
    setUser(userWithRole);
  };

  const logout = () => {
    localStorage.removeItem('resumex_token');
    localStorage.removeItem('resumex_user');
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isAdmin: Boolean(user && user.role === 'admin'),
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
