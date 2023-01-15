import Avatar from "@/components/UI/Avatar";
import useStaffStore from "@/store/staff-store";
import AMPM from "@/utils/convertAMPM";

interface IMessage {
  id: string;
  date: Date;
  participant: { profileId: string; id: string };
  text: string;
}

interface IResponseMessageProps {
  message: IMessage;
  timeStyles: string;
}

const ResponseMessage: React.FunctionComponent<IResponseMessageProps> = ({
  message,
  timeStyles,
}) => {
  const staffStore = useStaffStore();
  const { text, date } = message;
  const profile = staffStore.staff[message.participant.profileId];
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
