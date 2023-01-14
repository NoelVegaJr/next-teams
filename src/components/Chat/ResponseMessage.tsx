import Avatar from "@/components/UI/Avatar";
import AMPM from "@/utils/convertAMPM";
import type { ConversationParticipant, Message, Profile } from "@prisma/client";

interface IConversationParticipant extends ConversationParticipant {
  profile: Profile;
}

interface IMessage extends Message {
  participant: IConversationParticipant;
}
interface IResponseMessageProps {
  message: IMessage;
  timeStyles: string;
}

const ResponseMessage: React.FunctionComponent<IResponseMessageProps> = ({
  message,
  timeStyles,
}) => {
  const { text, participant, date } = message;
  const { profile } = participant;
  return (
    <>
      <div className="flex w-20 justify-end ">
        <Avatar
          name={profile.name}
          image={profile.avatar}
          size="sm"
          status={profile.status}
        />
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center gap-2">
          <p className={`font-semibold  `}>{profile.name}</p>
          <p className={`w-32  ${timeStyles} `}>{AMPM(date)}</p>
        </div>
        <p className={` `}>{text}</p>
      </div>
    </>
  );
};

export default ResponseMessage;
