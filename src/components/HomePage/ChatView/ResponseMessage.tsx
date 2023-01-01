import {
  faSmile,
  faReply,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Link from "next/link";
import Avatar from "@/components/UI/Avatar";

interface IUser {
  id: string;
  username: string | null;
  image: string | null;
  status: string | null;
}

interface IMessage {
  conversationId: string;
  id: string;
  date: Date;
  text: string;
  participant: { id: string; user: IUser };
}

interface IResponseMessageProps {
  message: IMessage;
  index: number;
  isHovered: boolean;
  setHovered: (ctx: { id: string; index: number } | null) => void;
}

const ResponseMessage: React.FunctionComponent<IResponseMessageProps> = ({
  message,
  isHovered,
  setHovered,
  index,
}) => {
  const { user } = message.participant;
  return (
    <div
      key={message.id}
      onMouseOver={() => {
        setHovered({ id: message.id, index });
      }}
      onMouseLeave={() => {
        setHovered(null);
      }}
      className={`${
        isHovered && "bg-slate-700/30"
      } relative flex w-full gap-4 pt-2`}
    >
      <div className="flex w-20 justify-end ">
        <Avatar
          username={user.username ?? ""}
          image={user.image ?? ""}
          size="sm"
          status={user.status}
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center gap-2">
          <p className="font-bold text-slate-200">
            {message?.participant?.user?.username}
          </p>
          <p className="w-32  text-sm text-slate-400">
            {new Date(message.date).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
        {message.text.slice(0, 4) === "www." ? (
          <Link
            href={message.text}
            className="p-1  text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.text}
          </Link>
        ) : (
          <p className="p-1 text-slate-300">{message.text}</p>
        )}
      </div>
      <div
        className={` right-0 -top-1 z-50  flex w-fit  overflow-hidden rounded-lg  bg-slate-800 text-xl text-slate-400 brightness-125 ${
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

export default ResponseMessage;
