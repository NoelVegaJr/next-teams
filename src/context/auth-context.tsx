import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect } from "react";

interface IUser {
  name: string;
  email: string;
  image: string;
  id: string;
}

export const UserContext = createContext<Session | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useSession();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
