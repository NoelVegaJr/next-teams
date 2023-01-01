import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ServerContext } from "@/context/server-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Modal from "@/components/UI/Modal";
import { s3FileUpload } from "@/utils/fileUpload";
import { UserContext } from "@/context/auth-context";
import { ServerOptionsContext } from "@/context/server-options-context";
import Link from "next/link";

const WorkspaceList: React.FunctionComponent = () => {
  const utils = trpc.useContext();
  const userCtx = useContext(UserContext);
  const serverCtx = useContext(ServerContext);
  const serverOptionsCtx = useContext(ServerOptionsContext);
  const router = useRouter();
  const server = trpc.server.getServerById.useQuery({ id: router.query.id });
  const workspaceMutation = trpc.server.createWorkspace.useMutation({
    onSuccess: () => {
      utils.user.profile.invalidate();
    },
  });
  const [workspaceName, setWorkspaceName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [newWorkspaceModal, setNewWorkspaceModal] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (server.data?.workspace) {
      serverCtx?.setWorkspace(server.data?.workspace[0]);
      serverCtx?.setChannel(server.data?.workspace[0]?.channels[0]);
    }
  }, [server.data?.workspace]);

  const handleUpload = async () => {
    await s3FileUpload(imageFile);

    // if (!userCtx?.user?.id) return;

    // if (!imageFile) {
    //   serverMutation.mutate({
    //     userId: userCtx.user.id,
    //     name: serverName,
    //     image: "/defaultserver.png",
    //   });
    // } else {
    //   serverMutation.mutate({
    //     userId: userCtx.user.id,
    //     name: serverName,
    //     image: imageFile.name,
    //   });
    // }
  };

  const createWorkspaceHandler = () => {
    if (!workspaceName || !userCtx?.profile?.user?.id) return;
    workspaceMutation.mutate({
      id: router.query.id,
      name: workspaceName,
      image: imageFile?.name ?? "/defaultserver.png",
      userId: userCtx.profile.user.id,
    });
    setNewWorkspaceModal(false);
  };
  console.log("SERVER CTX: ", serverCtx.server);
  console.log("workspace list: ", serverCtx?.server?.workspace);

  return (
    <>
      {!serverCtx?.server?.workspace?.length && loaded && (
        <Modal
          close={() => {
            if (server.data?.workspace.length === 0) return;
            setNewWorkspaceModal(false);
          }}
        >
          <div
            className="mx-auto w-96 rounded bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b p-2">
              <p className=" font-semibold">Create Workspace</p>
              <button onClick={() => setNewWorkspaceModal(false)}>
                <FontAwesomeIcon icon={faX} className="text-red-600" />
              </button>
            </div>
            <div className="p-2">
              <div className="group relative mx-auto w-fit cursor-pointer overflow-hidden rounded">
                <label htmlFor="serverImg" className=" w-full  text-white">
                  <div className="relative h-32 w-32 overflow-hidden rounded">
                    <Image
                      src="/defaultserver.png"
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
                        setImageFile(files[0]);
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
              <input
                type="text"
                placeholder="Workspace Name"
                className="my-2 w-full rounded border p-1 outline-none"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />

              <div className=" text-right">
                <button
                  onClick={createWorkspaceHandler}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {newWorkspaceModal && (
        // (newWorkspaceModal && (
        <Modal
          close={() => {
            if (server.data?.workspace.length === 0) return;
            setNewWorkspaceModal(false);
          }}
        >
          <div
            className="mx-auto w-96 rounded bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b p-2">
              <p className=" font-semibold">Create Workspace</p>
              <button onClick={() => setNewWorkspaceModal(false)}>
                <FontAwesomeIcon icon={faX} className="text-red-600" />
              </button>
            </div>
            <div className="p-2">
              <div className="group relative mx-auto w-fit cursor-pointer overflow-hidden rounded">
                <label htmlFor="serverImg" className=" w-full  text-white">
                  <div className="relative h-32 w-32 overflow-hidden rounded">
                    <Image
                      src="/defaultserver.png"
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
                        setImageFile(files[0]);
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
              <input
                type="text"
                placeholder="Workspace Name"
                className="my-2 w-full rounded border p-1 outline-none"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />

              <div className=" text-right">
                <button
                  onClick={createWorkspaceHandler}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="flex h-full flex-col items-center justify-center bg-slate-700 p-4">
        <Link href="/home" className=" pb-4">
          <div
            // key={workspace.id}
            className={`w-fit  rounded-lg p-0.5`}
          >
            <FontAwesomeIcon
              icon={faHome}
              className="text-4xl text-slate-400"
            />
          </div>
        </Link>
        <button
          className="mb-4 border-b pb-4"
          onClick={() => {
            serverOptionsCtx.open();
            console.log("click server tile");
          }}
        >
          <div
            // key={workspace.id}
            className={`w-fit  rounded-lg p-0.5`}
          >
            <div className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-lg ">
              <Image
                src={serverCtx?.server?.image ?? "/defaultserver.png"}
                alt="workspace"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </button>
        <ul className="flex h-full flex-1 flex-col items-center gap-4  ">
          {serverCtx?.server?.workspace.map((workspace: any) => {
            return (
              <li
                onClick={() => serverCtx?.setWorkspace(workspace)}
                key={workspace.id}
                className={`w-fit  rounded-lg  ${
                  serverCtx?.openWorkspace?.id === workspace.id
                    ? "border-2 border-blue-500"
                    : "hover:border-2 hover:border-slate-400"
                }  p-0.5`}
              >
                <div className="relative h-12 w-12 cursor-pointer overflow-hidden rounded-lg ">
                  <Image
                    src={workspace.image}
                    alt="workspace"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </li>
            );
          })}
          <button
            onClick={() => setNewWorkspaceModal(true)}
            className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-800  bg-slate-500/80 shadow-2xl"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="font-bold text-green-400"
            />
          </button>
        </ul>
      </div>
    </>
  );
};

export default WorkspaceList;
