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
    <>
      <div
        className={` h-${size} w-${size} animate-spin rounded-full border-${thickness} ${color}`}
      ></div>
    </>
  );
};

export const Sandbox = () => {
  return (
    <>
      <button className="flex items-center gap-4 rounded bg-indigo-600 p-1 px-4">
        <Spinner size={5} thickness={2} />
        <p className="text-white">Loading</p>
      </button>
    </>
  );
};

export default Sandbox;
