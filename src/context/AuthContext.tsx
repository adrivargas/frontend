
import { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  nombre: string;
  username: string;
  correo: string;
  role: 'admin' | 'user';
  token?: string; // opcional para mantener compatibilidad
}

interface AuthContextType {
  token: string | null;
  role: 'admin' | 'user' | null;
  user: User | null;
  login: (token: string, role: 'admin' | 'user', user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const stored = localStorage.getItem('user');
  const parsed = stored ? JSON.parse(stored) : null;

  const [token, setToken] = useState<string | null>(parsed?.token || null);
  const [role, setRole] = useState<'admin' | 'user' | null>(parsed?.role || null);
  const [user, setUser] = useState<User | null>(parsed || null);

  const login = (token: string, role: 'admin' | 'user', user: User) => {
    const userData = { token, ...user };

    localStorage.setItem('user', JSON.stringify(userData));

    setToken(token);
    setRole(role);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
