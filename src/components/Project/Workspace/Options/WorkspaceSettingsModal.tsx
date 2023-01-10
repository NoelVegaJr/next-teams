import { faX, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import workspace from "@/components/misc/workspace";
import * as React from "react";
import Image from "next/image";
import useProfileStore from "store/profile-store";
import { useState } from "react";

interface IWorkspaceSettingsModalProps {
  close: () => void;
}

const WorkspaceSettingsModal: React.FunctionComponent<
  IWorkspaceSettingsModalProps
> = ({ close }) => {
  const workspace = useProfileStore().activeWorkspace;
  const [name, setName] = useState(workspace.name);

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-full bg-slate-800 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex justify-between">
          <p className="text-3xl font-semibold text-white">
            Workspace Settings
          </p>
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
                    src={workspace.image}
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
          </div>

          <div className="flex w-1/2 flex-col gap-2">
            <label
              htmlFor="name"
              className="font-semibold uppercase text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="rounded border border-slate-900 bg-slate-800 p-2 text-white outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="my-10 border-t-2 border-t-slate-500" />
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-semibold uppercase text-slate-400">
              or, send a server invite link to a friend
            </p>

            <div className="flex items-center justify-between rounded bg-slate-800 p-2">
              <button
                onClick={() => console.log("click")}
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

export default WorkspaceSettingsModal;
