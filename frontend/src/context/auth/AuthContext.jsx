import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);


  // Load from localStorage on mount
  useEffect(() => {
const user = JSON.parse(localStorage.getItem("user"));

   if(user){
    setUser(user)
   }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
