import Avatar from "@/components/UI/Avatar";
import type { MessageAndParticipant } from "@/types/types";
import AMPM from "@/utils/convertAMPM";

interface IResponseMessageProps {
  message: MessageAndParticipant;
  timeStyles: string;
}

const ResponseMessage: React.FunctionComponent<IResponseMessageProps> = ({
  message,
  timeStyles,
}) => {
  const { date, participant, text } = message;
  const { profile } = participant;
  return (
    <>
      <div className="flex w-20 justify-end ">
        <Avatar
          username={profile.username}
          image={profile.avatar}
          size="sm"
          status={profile.status}
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center gap-2">
          <p className={`font-semibold  `}>{profile.username}</p>
          <p className={`w-32  ${timeStyles} `}>{AMPM(date)}</p>
        </div>
        <p className={`p-1  `}>{text}</p>
      </div>
    </>
  );
};

export default ResponseMessage;
