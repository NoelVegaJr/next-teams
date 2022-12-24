import { createContext, useState } from "react";

interface IUser {
  id: number;
  name: string;
  image: string;
}

const user1 = {
  id: 1,
  name: "Noel Vega",
  image: "/noelvega.jfif",
};

const user2 = {
  id: 2,
  name: "Michael Scott",
  image: "/michaelscott.jfif",
};

const user3 = {
  id: 3,
  name: "Dwight Shrute",
  image: "/dwightshrute.jfif",
};

const users = [user1, user2, user3];

interface IChannel {
  id: number;
  name: string;
  contributors: IUser[];
}

interface IChannelContext {
  channel: IChannel;
  set: (channel: IChannel) => void;
}

const channels: IChannel[] = [
  { id: 1, name: "Product", contributors: users },
  { id: 2, name: "Sales", contributors: users },
  { id: 3, name: "Marketing", contributors: users },
  { id: 4, name: "Engineering", contributors: users },
];

export const ChannelContext = createContext<IChannelContext | null>(null);

const ChannelProvider = ({ children }: { children: JSX.Element }) => {
  const [channel, setChannel] = useState<IChannel>(channels[0]);

  const changeChannelHandler = (channel: IChannel) => {
    setChannel(channel);
  };

  return (
    <ChannelContext.Provider value={{ channel, set: changeChannelHandler }}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
