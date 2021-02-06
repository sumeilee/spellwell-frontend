import React, { useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import jwt from "jsonwebtoken";

const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
});

export const AuthContextProvider = withCookies((props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = props.cookies.get("token");
    if (token) {
      setUser(jwt.decode(token));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
});

export default AuthContext;
