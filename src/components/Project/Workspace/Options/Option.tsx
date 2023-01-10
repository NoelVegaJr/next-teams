import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

interface IOptionProps {
  onClick: () => void;
  icon: any;
  text: string;
}

const Option: React.FunctionComponent<IOptionProps> = ({
  onClick,
  icon,
  text,
}) => {
  return (
    <button
      className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-indigo-600"
      onClick={onClick}
    >
      <p>{text}</p>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Option;
