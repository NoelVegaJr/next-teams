import * as React from "react";
import Image from "next/image";
import type { Size } from "@/types/types";
interface ITileProps {
  src: string;
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
}

const Tile: React.FunctionComponent<ITileProps> = ({
  src,
  size,
  className,
}) => {
  let tileSize;
  switch (size) {
    case "xs":
      tileSize = "h-10 w-10";
      break;
    case "sm":
      tileSize = "h-12 w-12";
      break;
    case "md":
      tileSize = "h-16 w-16";
      break;
    case "lg":
      tileSize = "h-20 w-20";
      break;
    case "xl":
      tileSize = "h-24 w-24";
      break;
    case "2xl":
      tileSize = "h-32 w-32";
      break;
    case "3xl":
      tileSize = "h-40 w-40";
      break;
    case "4xl":
      tileSize = "h-44 w-44";
      break;
    case "5xl":
      tileSize = "h-48 w-48";
      break;
    default:
      tileSize = "h-12 w-12";
  }
  return (
    <div
      className={`${className} relative flex ${tileSize} overflow-hidden rounded-lg`}
    >
      <Image
        style={{ objectFit: "cover" }}
        src={src}
        fill
        alt=""
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      />
    </div>
  );
};

export default Tile;
