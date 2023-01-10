import Avatar from "@/components/UI/Avatar";
import Modal from "@/components/UI/Modal";
import { trpc } from "@/utils/trpc";
import { faHashtag, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useChannelStore from "store/channel-store";
import useProfileStore from "store/profile-store";

const InvitePeopleModal = ({ close }: { close: () => void }) => {
  const utils = trpc.useContext();
  const [memberName, setMemberName] = useState("");
  const workspace = useProfileStore().activeWorkspace;
  const channelMembersip = useChannelStore().active.get(workspace.id);

  const [filteredServerMembers, setFilteredServerMembers] = useState<any>([]);

  const serverMembersNotInWorkspaceQuery =
    trpc.server.getServerMembersNotInWorkspace.useQuery({
      serverId: useProfileStore().serverId,
      workspaceId: workspace.id,
    });

  const createWorkspaceMemberMutation =
    trpc.server.createWorkspaceMember.useMutation({
      onSuccess: () => {
        utils.server.getServerMembersNotInWorkspace;
      },
    });

  const inviteHandler = (id: string) => {
    createWorkspaceMemberMutation.mutate({
      profileId: id,
      workspaceId: workspace.id,
    });
  };

  useEffect(() => {
    if (serverMembersNotInWorkspaceQuery?.data) {
      setFilteredServerMembers(
        serverMembersNotInWorkspaceQuery.data.filter(
          (member) =>
            member.profile.username.includes(memberName) ||
            member.profile.name.includes(memberName)
        )
      );
    }
  }, [serverMembersNotInWorkspaceQuery.data, memberName]);
  return (
    <Modal close={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-lg rounded bg-slate-600"
      >
        <div className="mb-2 flex flex-col gap-1 px-4 pt-4">
          <div className="flex justify-between">
            <p className=" font-semibold text-slate-200">
              Invite server members to {workspace.name}
            </p>
            <button
              onClick={close}
              className="transition-color text-lg text-slate-400 duration-300 hover:text-slate-200"
            >
              <FontAwesomeIcon icon={faX} className="" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <FontAwesomeIcon icon={faHashtag} />
            <p>{channelMembersip?.channel?.name as string}</p>
          </div>
        </div>
        <div className="mb-4 px-4">
          <div className="flex items-center rounded bg-slate-700 px-2 py-1">
            <input
              type="text"
              className="w-full  bg-transparent text-slate-200 outline-none"
              placeholder="Search for server members"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button
              onClick={() => {
                if (memberName) {
                  setMemberName("");
                }
              }}
              className="text-slate-400"
            >
              {!memberName ? (
                <FontAwesomeIcon icon={faSearch} />
              ) : (
                <FontAwesomeIcon icon={faX} />
              )}
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-slate-700" />
        <ul className=" overflow-hidden rounded p-4">
          {!filteredServerMembers.length && (
            <p className="text-center text-xl font-semibold uppercase text-slate-400">
              No results found
            </p>
          )}
          {filteredServerMembers.map((member: any) => {
            const { id, username, name, avatar, status } = member.profile;
            return (
              <li
                key={member.id}
                className="transition-color flex  items-center justify-between p-2 duration-100 hover:bg-slate-500/50"
              >
                <div className="flex gap-4">
                  <Avatar
                    image={avatar}
                    size="xs"
                    status={status}
                    username={username}
                  />
                  <div className="text-slate-200">
                    <p>{username}</p>
                    <p className="text-xs">{name}</p>
                  </div>
                </div>
                <button
                  onClick={() => inviteHandler(id)}
                  className="h-fit rounded border-2 border-green-700 py-1 px-4 font-semibold text-slate-200 transition-all duration-100 hover:bg-green-700  "
                >
                  Invite
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default InvitePeopleModal;
