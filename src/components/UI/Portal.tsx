import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type IPortalProps = {
  children: JSX.Element;
};

export const Portal: FunctionComponent<IPortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      createPortal(children, document.getElementById("myportal")!)
    : null;
};

export default Portal;
