import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { firebaseAuth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((usr) => {
      console.log(usr);
      setUser(usr);
      setLoading(false);
      if (user != null) {
        history.push("/chats");
      }
    });
  }, [user, history]);

  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
