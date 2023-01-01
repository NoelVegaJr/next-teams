import { createContext, useState } from "react";

interface IServerOptionsContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const inititalValue = {
  isOpen: false,
  open: () => {
    return;
  },
  close: () => {
    return;
  },
};

export const ServerOptionsContext =
  createContext<IServerOptionsContext>(inititalValue);

interface IServerProviderProps {
  children: JSX.Element;
}

export const ServerOptionsProvider = ({ children }: IServerProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
    console.log("open server options");
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <ServerOptionsContext.Provider
      value={{
        isOpen,
        open: () => {
          console.log("open settings");
          setIsOpen(true);
        },
        close,
      }}
    >
      {children}
    </ServerOptionsContext.Provider>
  );
};
