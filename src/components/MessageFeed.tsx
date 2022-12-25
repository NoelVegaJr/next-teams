import Image from "next/image";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { pusherClient } from "../utils/pusher";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";

interface IUser {
  id: number;
  name: string;
  image: string;
}

interface IMessage {
  id: number;
  user: IUser;
  text: string;
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

const MessageFeed: React.FunctionComponent = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = trpc.chat.push.useMutation();

  useEffect(() => {
    const channel = pusherClient.subscribe("test" ?? "");
    channel.bind("new-message", (msg: IMessage) => {
      console.log("new message");
      setMessages((prev: IMessage[]) => [...prev, msg]);
    });
    return () => {
      pusherClient.unsubscribe("test");
    };
  }, []);

  const sendMessageHandler = () => {
    if (!newMessage) return;
    sendMessage.mutate({
      text: newMessage,
      user: user2,
    });
  };

  return (
    <>
      <div className=" flex-1 overflow-y-scroll  pt-2">
        <ul>
          {messages?.map((message) => {
            return (
              <li
                key={message.id}
                className={`flex w-full px-6 ${
                  message.user.id === 1 && "justify-end"
                }`}
              >
                <div className="flex gap-4">
                  {/* Profile image */}
                  {message.user.id !== 1 && (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={message.user.image}
                        fill
                        alt="profile picture"
                      />
                    </div>
                  )}

                  <div className="">
                    {message.user.id !== 1 && (
                      <p className="mb-2 font-semibold">{message.user.name}</p>
                    )}

                    <div className="w-fit rounded-lg bg-blue-500 py-2 px-4 text-white">
                      <p>{message.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border-t-2 bg-slate-100 p-4">
        <div className="flex items-center rounded-lg border-2 bg-white p-1 pr-4 shadow">
          <input
            placeholder="Send a message..."
            type="text"
            className="w-full  p-1 outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessageHandler()}
          />
          <button onClick={sendMessageHandler}>
            <FontAwesomeIcon icon={faPaperPlane} className="text-blue-600" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageFeed;
