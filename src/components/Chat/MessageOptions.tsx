import {
  faEllipsisH,
  faReply,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import type { FunctionComponent } from "react";

const MessageOptions: FunctionComponent = () => {
  return (
    <div
      className={` absolute right-0 -top-1  z-50 flex  w-fit overflow-hidden  rounded-lg bg-slate-800 text-xl text-slate-400 
        brightness-125`}
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
  );
};

export default MessageOptions;
