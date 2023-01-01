import axios from "axios";

import type { NextPageContext } from "next/types";
import * as React from "react";
import ChannelProvider from "../../context/channel-context";
import ServerProvider from "../../context/server-context";
import Server from "../../components/Servers/Server";
import { ServerOptionsProvider } from "../../context/server-options-context";
import { getSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useContext } from "react";
import { UserContext } from "../../context/auth-context";

interface IServerPageProps {
  id: string;
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const data = await getSession(ctx);

  const res = await axios.get("http://localhost:3000/api/server", {
    params: { id: ctx.query.id },
  });
  if (!res.data.server || !data?.user?.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  // return { props: { server: res.data.server } };
  return { props: { id: ctx.query.id } };
};

const ServerPage: React.FunctionComponent<IServerPageProps> = (props) => {
  const userCtx = useContext(UserContext);
  const server = trpc.server.getServerById.useQuery({ id: props.id });
  console.log(props.id);
  console.log(
    userCtx?.profile?.servers.find((server) => server.server.id === props.id)
  );

  return (
    <ServerProvider
      server={userCtx?.profile?.servers.find(
        (server: any) => server.server.id === props.id
      )}
    >
      <ServerOptionsProvider>
        <ChannelProvider>
          <Server />
        </ChannelProvider>
      </ServerOptionsProvider>
    </ServerProvider>
  );
};

export default ServerPage;
