import { createContext, useState } from "react";
// import * as UserService from "../../Services/users";

export const AuthContext = createContext({
  authorized: false,
  user: null,
  setAuthorized: () => {},
  setUser: () => ({ yep: "its here itshere" }),
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [authorized, setAuthorized] = useState(null);

  const value = {
    authorized,
    user,
    setAuthorized,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
