import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  nombre: string;
  username: string;
  correo: string;
  role: 'admin' | 'user';
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
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<'admin' | 'user' | null>(
    localStorage.getItem('role') as 'admin' | 'user' | null
  );
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  const login = (token: string, role: 'admin' | 'user', user: User) => {
    setToken(token);
    setRole(role);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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
