import type { IServer } from "@/types/types";
import { faX, faUpload, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

interface IServerOptionsViewProps {
  server: IServer;
  close: () => void;
  profileId: string;
}

const ServerOptionsView: React.FunctionComponent<IServerOptionsViewProps> = ({
  server,
  profileId,
  close,
}) => {
  const [name, setName] = useState(server.name);
  const newInvitationMutation =
    trpc.server.newInvitationLinkByServerId.useMutation();

  const newInvitationHandler = async () => {
    const invitation = await newInvitationMutation.mutateAsync({
      senderProfileId: profileId,
      id: server.id,
    });
    if (invitation) {
      navigator.clipboard.writeText(invitation);
    }
  };
  return (
    <div className="h-screen bg-slate-700 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex justify-between">
          <p className="text-3xl font-semibold text-white">Server Overview</p>
          <button
            onClick={close}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-400 text-slate-400"
          >
            <FontAwesomeIcon icon={faX} className="text-xl" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-1/2 gap-6">
            <div className="group relative mx-auto w-fit cursor-pointer overflow-hidden rounded">
              <label htmlFor="serverImg" className=" w-full  text-white">
                <div className="relative h-32 w-32 overflow-hidden rounded">
                  <Image
                    src={server.image}
                    fill
                    alt="default server logo"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <input
                  id="serverImg"
                  type="file"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      //   setImageFile(files[0]);
                    }
                  }}
                  accept=".png,.jpg, .jpeg"
                  className="text-white"
                  hidden={true}
                />
              </label>
              <label
                htmlFor="serverImg"
                className="absolute top-0  hidden h-full w-full cursor-pointer place-content-center bg-black/10 group-hover:grid"
              >
                <FontAwesomeIcon icon={faUpload} className="text-2xl" />
              </label>
            </div>
            {/* <button className="self-end rounded border p-2 text-slate-300">
                  Upload Image
                </button> */}
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            <label
              htmlFor="servername"
              className="font-semibold uppercase text-slate-300"
            >
              Server Name
            </label>
            <input
              id="servername"
              type="text"
              className="rounded border border-slate-900 bg-slate-800 p-2 text-white outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="my-10 border-t-2 border-t-slate-500" />
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="inviteFriends"
              className="text-xl font-semibold text-slate-300"
            >
              Invite friends to {server.name}
            </label>
            <p className="flex items-center gap-2 text-xl text-slate-400">
              <FontAwesomeIcon icon={faHashtag} />
              <p>general</p>
            </p>
            <input
              id="inviteFriends"
              type="text"
              placeholder="Search for friends"
              className="rounded border border-slate-900 bg-slate-800 p-2 text-white outline-none "
            />
            {/* <div className="rounded-lg border border-slate-500 p-4">
                  {!userCtx?.user?.friends ? (
                    <p className="text-slate-400">No friends to invite</p>
                  ) : (
                    <ul></ul>
                  )}
                </div> */}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold uppercase text-slate-400">
              or, send a server invite link to a friend
            </p>

            <div className="flex items-center justify-between rounded bg-slate-800 p-2">
              {/* <p className="text-lg font-semibold text-slate-400">
                https://teamflow.gg/cwuR6maB
              </p> */}
              <button
                onClick={newInvitationHandler}
                className="w-full rounded bg-indigo-600 px-4 py-2 text-white"
              >
                Generate an invitation link
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServerOptionsView;
