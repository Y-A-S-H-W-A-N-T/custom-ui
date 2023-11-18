import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState("hello"); 

  const login = (userData) => {
    setUser(userData);
  };

  
  localStorage.setItem("user", JSON.stringify(user))
  



  const logout = () => {
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
