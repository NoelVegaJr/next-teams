import * as React from "react";
import Image from "next/image";
import StatusBubble from "./StatusBubble";
import type { Status } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface IAvatarProps {
  image: string;
  status: Status;
  username: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

const Avatar: React.FunctionComponent<IAvatarProps> = ({
  image,
  status,
  username,
  size,
}) => {
  let avatarSize;

  switch (size) {
    case "xs":
      avatarSize = "h-10 w-10";
      break;
    case "sm":
      avatarSize = "h-12 w-12";
      break;
    case "md":
      avatarSize = "h-16 w-16";
      break;
    case "lg":
      avatarSize = "h-20 w-20";
      break;
    case "xl":
      avatarSize = "h-24 w-24";
      break;
    default:
      avatarSize = "h-12 w-12";
  }

  return (
    <div className="relative h-fit w-fit">
      <div
        className={`relative ${avatarSize} overflow-hidden rounded-full ${
          !image && "border-2"
        }`}
      >
        {image !== "default" ? (
          <Image
            src={image}
            alt={`${username} avatar`}
            style={{ objectFit: "cover" }}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        ) : (
          <div className="grid h-full w-full place-content-center text-3xl text-slate-300">
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
      </div>
      <StatusBubble size={size} status={status} />
    </div>
  );
};

export default Avatar;
