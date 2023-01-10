import type { FunctionComponent } from "react";

interface ISpinnerProps {
  size: number;
  thickness: number;
  color?: { indicator: string; ring: string };
}

export const Spinner: FunctionComponent<ISpinnerProps> = ({
  size,
  thickness,
  color = { indicator: "border-t-gray-200/90", ring: "border-gray-200/50" },
}) => {
  return (
    <div
      className={` h-${size} w-${size} animate-spin rounded-full border-${thickness} ${color.ring} ${color.indicator} `}
    />
  );
};
