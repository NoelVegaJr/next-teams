import type { FunctionComponent } from "react";
import { useRef } from "react";

interface IChatInputProps {
  submit: (value: string) => void;
  className?: string;
}

const ChatInput: FunctionComponent<IChatInputProps> = ({
  submit,
  className,
}) => {
  const msgRef = useRef<HTMLInputElement>(null);
  return (
    <input
      ref={msgRef}
      type="text"
      className={`${className}`}
      placeholder="Message"
      onKeyDown={(e) => {
        const value = msgRef?.current?.value;
        if (e.key === "Enter" && value) {
          submit(value);
          msgRef.current.value = "";
        }
      }}
    />
  );
};

export default ChatInput;
