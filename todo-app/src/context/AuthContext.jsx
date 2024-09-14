import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);  // Store registered users
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const login = (values) => {
    const user = users.find((u) => u.email === values.email && u.password === values.password);
    
    if (user) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid email or password');
      setIsAuthenticated(false);
    }
  };

  const register = (values) => {
    const userExists = users.some((u) => u.email === values.email);

    if (userExists) {
      setError('Email is already registered');
    } else {
      // Register new user and log them in
      setUsers([...users, values]);
      setIsAuthenticated(true);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider value={{ login, register, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
