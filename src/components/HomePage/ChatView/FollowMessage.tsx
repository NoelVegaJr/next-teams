import {
  faSmile,
  faReply,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface IUser {
  id: string;
  username: string | null;
  image: string | null;
}

interface IMessage {
  conversationId: string;
  id: string;
  date: Date;
  text: string;
  participant: { id: string; user: IUser };
}

interface IFollowMessageProps {
  message: IMessage;
  index: number;
  isHovered: boolean;
  setHovered: (ctx: { id: string; index: number } | null) => void;
}

const FollowMessage: React.FunctionComponent<IFollowMessageProps> = ({
  message,
  isHovered,
  setHovered,
  index,
}) => {
  return (
    <div
      key={message.id}
      onMouseOver={() => {
        setHovered({ id: message.id, index });
      }}
      className={`${
        isHovered && "bg-slate-700/30"
      } relative z-0  flex items-center justify-between`}
    >
      <div className="flex items-center gap-4">
        <p
          className={`w-20 ${
            isHovered ? "block" : "text-transparent"
          } text-right text-sm text-slate-400`}
        >
          {new Date(message.date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
        {message.text.slice(0, 4) === "www." ? (
          <a className="p-1  text-blue-600 underline" target="_blank">
            {message.text}
          </a>
        ) : (
          <p className="p-1 text-slate-300">{message.text}</p>
        )}
      </div>
      <div
        className={` right-0 -top-8 z-50  flex w-fit  overflow-hidden rounded-lg  bg-slate-800 text-xl text-slate-400 brightness-125 ${
          isHovered ? "absolute" : "hidden"
        }`}
      >
        <div>
          <button className="p-2 px-3 hover:bg-slate-800 hover:brightness-110">
            <FontAwesomeIcon icon={faSmile} />
          </button>
        </div>
        <div>
          <button className="p-2 px-3 hover:bg-slate-800 hover:brightness-110">
            <FontAwesomeIcon icon={faReply} />
          </button>
        </div>
        <div>
          <button className="p-2 px-3 hover:bg-slate-800 hover:brightness-110">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowMessage;
