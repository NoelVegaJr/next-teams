import type { FunctionComponent } from "react";
import Modal from "@/components/UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import type { Contributer, Profile } from "@prisma/client";
import Avatar from "@/components/UI/Avatar";

interface IContributer extends Contributer {
  profile: Profile;
}

interface IContributorsModalProps {
  contributers: IContributer[];
  close: () => void;
}

const ContributorsModal: FunctionComponent<IContributorsModalProps> = ({
  close,
  contributers,
}) => {
  return (
    <Modal close={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" mx-auto h-96 max-h-96 w-1/2 rounded-lg bg-white"
      >
        <p className="border-b-2 p-4 font-semibold">Contributors</p>
        <div className="m-1 flex items-center rounded-lg border-2 px-2">
          <input
            placeholder="Search contributors"
            type="text"
            className="h-full  w-full p-2 outline-none"
          />
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <ul className="flex cursor-pointer flex-col py-4">
          {contributers.map((c) => {
            const { profile } = c;
            return (
              <li key={c.id} className="py-4 hover:bg-slate-100">
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
