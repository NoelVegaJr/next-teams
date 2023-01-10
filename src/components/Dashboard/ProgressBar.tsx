import { Spring } from "react-spring";

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="relative h-5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-5 rounded-full bg-blue-600 text-center"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
          {percentage} %
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
