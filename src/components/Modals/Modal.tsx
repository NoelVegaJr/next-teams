import { FunctionComponent } from "react";
import { animated, useTransition } from "react-spring";
import Portal from "../UI/Portal";

type ModalStyles = {
  modal?: string;
  title?: string;
  backdrop?: string;
  body?: string;
};

type IModalProps = {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  close: () => void;
  title?: string;
  size?: "xs" | "sm" | "md" | "lg" | "full";
  styles?: ModalStyles;
};

export const Modal: FunctionComponent<IModalProps> = ({
  isOpen,
  children,
  close,
  size = "md",
  title,
  styles,
}) => {
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const modalSize = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    full: "max-w-full",
  };
  return (
    <Portal>
      {transitions(
        (style, open) =>
          open && (
            <animated.div
              style={style}
              onClick={close}
              className={`fixed flex h-screen w-full items-center justify-center bg-black/20 ${styles?.backdrop}`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`w-full rounded-lg shadow-xl ${modalSize[size]} ${styles?.modal} bg-white`}
              >
                {title && (
                  <div className={`px-4 pt-4 text-xl ${styles?.title}`}>
                    {title}
                  </div>
                )}
                <div className={`p-4 ${styles?.body}`}>{children}</div>
              </div>
            </animated.div>
          )
      )}
    </Portal>
  );
};

export default Modal;
