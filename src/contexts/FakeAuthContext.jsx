import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Authcontext are used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };

//this is the boiler plate code of context API
