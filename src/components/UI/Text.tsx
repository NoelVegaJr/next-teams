import { Size } from "@/types/types";
import * as React from "react";

interface ITextProps {
  children: string;
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  uppercase?: boolean;
  className?: string;
}

const Text: React.FunctionComponent<ITextProps> = ({
  children,
  className,
  weight = "normal",
  size = "base",
  uppercase,
}) => {
  return (
    <p
      className={`${className} font-${weight} text-${size} ${
        uppercase && "uppercase"
      }`}
    >
      {children}
    </p>
  );
};

export default Text;
