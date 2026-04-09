import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Default: logged in — so app opens directly to home
  const [user, setUser] = useState({
    name: 'Harsh',
    email: 'harsh@fingo.app',
    avatar: 'H',
  });

  const signOut = () => setUser(null);
  const signIn  = (userData) => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
