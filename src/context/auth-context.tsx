import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

export const UserContext = createContext<any>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useSession();
  const profileQuery = trpc.user.getProfile.useQuery(
    {
      userId: user?.user?.id ?? "",
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
  return (
    <UserContext.Provider
      value={{ profile: profileQuery.data, refetch: profileQuery.refetch }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
