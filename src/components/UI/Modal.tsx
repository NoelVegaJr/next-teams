import * as React from "react";
import { createPortal } from "react-dom";

const BackDrop = ({
  children,
  close,
}: {
  children: JSX.Element;
  close: () => void;
}) => {
  return createPortal(
    <div
      onClick={close}
      className="fixed top-0 z-50 flex h-screen w-full items-center justify-center bg-black/30"
    >
      {children}
    </div>,
    document.getElementById("__next")!
  );
};

const Modal = ({
  children,
  close,
}: {
  children: JSX.Element;
  close: () => void;
}) => {
  return (
    <BackDrop close={close}>
      <div className="flex  w-full items-center justify-between">
        {children}
      </div>
    </BackDrop>
  );
};

export default Modal;
