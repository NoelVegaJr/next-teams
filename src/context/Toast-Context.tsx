import {
  Component,
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const ToastContext = createContext((toast: any) => {
  return;
});

interface ToastContextProviderProps {
  children: JSX.Element;
}

export const ToastContextProvider: FunctionComponent<
  ToastContextProviderProps
> = ({ children }) => {
  const [toasts, setToasts] = useState<FunctionComponent[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((toasts) => toasts.slice(1)),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback(
    (toast: any) => {
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      <div className="fixed top-0 z-50 w-full">
        {toasts.map((Toast: any, index: number) => {
          return Toast;
        })}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

// export const useToastContext = () => {
//   return useContext(ToastContext);
// };
