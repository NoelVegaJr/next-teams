import type { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import type { Contributer, Profile } from "@prisma/client";
import Avatar from "@/components/UI/Avatar";
import Modal from "./Modal";
import useStaffStore from "@/store/staff-store";

interface IContributer extends Contributer {
  profile: Profile;
}

interface IContributorsModalProps {
  contributors: { profileId: string }[];

  close: () => void;
  isOpen: boolean;
}

const ContributorsModal: FunctionComponent<IContributorsModalProps> = ({
  close,
  isOpen,
  contributors,
}) => {
  const staffStore = useStaffStore();
  console.log("Contributors:", contributors);
  return (
    <Modal title="Contributors" isOpen={isOpen} close={close}>
      <div onClick={(e) => e.stopPropagation()} className=" ">
        <div className="m-1 flex items-center rounded-lg border-2 px-2">
          <input
            placeholder="Search contributors"
            type="text"
            className="h-full w-full border-none p-2 outline-none"
            style={{ outline: "none !important" }}
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <ul className="flex cursor-pointer flex-col py-4">
          {contributors?.map((c) => {
            const profile = staffStore.staff[c.profileId];
            return (
              <li key={profile.id} className="py-4 hover:bg-slate-100">
                <div className="flex items-center gap-4 pl-4">
                  <Avatar
                    image={profile.avatar}
                    name={profile.name}
                    size="sm"
                    status={profile.status}
                  />
                  <p className="font-semibold">{profile.name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default ContributorsModal;
