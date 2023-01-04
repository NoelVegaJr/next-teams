import * as React from "react";

interface IStackProps {
  children: JSX.Element[] | JSX.Element;
  type?: "col" | "row";
  gap?: 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  className?: string;
  wrap?: boolean;
  center?: boolean;
  position?: "relative" | "static" | "absolute" | "fixed";
}

const Stack: React.FunctionComponent<IStackProps> = ({
  children,
  type = "col",
  gap = 2,
  wrap = false,
  center = false,
  position,
  className,
}) => {
  let centerType;
  if (type === "row") {
    centerType = "items-center";
  } else {
    centerType = "items-center";
  }
  return (
    <ul
      className={`flex flex-${type} gap-${gap} ${
        wrap && "flex-wrap"
      } ${className} ${center && centerType} ${position}`}
    >
      {children}
    </ul>
  );
};

export default Stack;
