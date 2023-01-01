import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect } from "react";

interface IUser {
  name: string;
  email: string;
  image: string;
  id: string;
}

export const ProfileContext = createContext<Session | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useSession();

  return (
    <ProfileContext.Provider value={user}>{children}</ProfileContext.Provider>
  );
};

export default UserProvider;
