import { createContext, useState } from "react";

interface IChannel {
  id: string;
  name: string;
  createdAt: Date;
  members: any;
}

interface IWorkspace {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  serverId: string;
  channels: IChannel[];
}

interface IServer {
  id: string;
  createdAt: Date;
  name: string;
  image: string;
  workspace: IWorkspace[];
}

interface IServerContext {
  server: IServer | null;
  openWorkspace: IWorkspace | null;
  setWorkspace: (workspace: IWorkspace) => void;
  setChannel: (channel: IChannel) => void;
  openChannel: IChannel | null;
}

export const ServerContext = createContext<IServerContext | null | any>(null);

const ServerProvider = ({
  children,
  server,
}: {
  children: JSX.Element;
  server?: IServer | null;
}) => {
  const [openWorkspace, setOpenWorkspace] = useState<IWorkspace | null>(null);
  const [openChannel, setOpenChannel] = useState<IChannel | null>(null);

  const changeWorkspace = (workspace: IWorkspace) => {
    setOpenWorkspace(workspace);
  };

  const changeChannel = (channel: IChannel) => {
    setOpenChannel(channel);
  };
  return (
    <ServerContext.Provider
      value={{
        ...server,
        openWorkspace,
        setWorkspace: changeWorkspace,
        openChannel,
        setChannel: changeChannel,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
