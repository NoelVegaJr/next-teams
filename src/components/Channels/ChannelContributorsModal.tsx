import { useContext } from "react";
import Modal from "@/components/UI/Modal";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ServerContext } from "@/context/server-context";

const ChannelContributorsModal = ({ close }: { close: () => void }) => {
  const workspaceCtx = useContext(ServerContext);
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
          {workspaceCtx?.openChannel?.members.map((member: any) => {
            const { user } = member;
            return (
              <li key={user.id} className="py-4 hover:bg-slate-100">
                <div className="flex items-center gap-4 pl-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full ">
                    <Image
                      src={user.image}
                      alt="profile picture"
                      fill
                      className=""
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default ChannelContributorsModal;