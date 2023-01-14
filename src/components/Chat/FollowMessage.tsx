import type { MessageAndParticipant } from "@/types/types";
import AMPM from "@/utils/convertAMPM";

interface IFollowMessageProps {
  message: MessageAndParticipant;
  timeStyles: string;
  isHovered: boolean;
}

const FollowMessage: React.FunctionComponent<IFollowMessageProps> = ({
  message,
  timeStyles,
  isHovered,
}) => {
  const { date, text } = message;
  return (
    <>
      <div className="flex items-center gap-4">
        <p
          className={`w-20 text-right ${timeStyles} ${
            isHovered ? "text-neutral-500" : "text-transparent"
          }`}
        >
          {AMPM(date)}
        </p>
        <p className={` `}>{text}</p>
      </div>
    </>
  );
};

export default FollowMessage;
