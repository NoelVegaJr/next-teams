import * as React from "react";

interface IStackProps {
  children: JSX.Element[];
  type?: "col" | "row";
  gap?: 0.5 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const Stack: React.FunctionComponent<IStackProps> = ({
  children,
  type = "col",
  gap = 2,
}) => {
  return <div className={`flex flex-${type} gap-${gap}`}>{children}</div>;
};

export default Stack;
