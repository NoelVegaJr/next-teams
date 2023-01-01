import { faPlus, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import Modal from "@/components/UI/Modal";
import { s3FileUpload } from "@/utils/fileUpload";
import { trpc } from "@/utils/trpc";
import { UserContext } from "@/context/auth-context";

interface IServer {
  id: string;
  name: string;
  _count: { members: number };
  image: string;
}

const ServerList = ({
  email,
  servers,
}: {
  email: string;
  userId: string;
  servers: IServer[] | undefined | any;
}) => {
  const utils = trpc.useContext();
  const userCtx = useContext(UserContext);
  const [newServerModal, setServerModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serverName, setServerName] = useState("");
  const serverMutation = trpc.server.create.useMutation({
    onSuccess: () => {
      utils.user.profile.invalidate();
    },
  });

  const handleUpload = async () => {
    await s3FileUpload(imageFile);

    if (!userCtx?.profile?.user?.id) return;

    if (!imageFile) {
      serverMutation.mutate({
        userId: userCtx.profile.user.id,
        name: serverName,
        image: "/defaultserver.png",
      });
    } else {
      serverMutation.mutate({
        userId: userCtx.profile.user.id,
        name: serverName,
        image: imageFile.name,
      });
    }
    setServerModal(false);
  };
  return (
    <>
      {newServerModal && (
        <Modal close={() => setServerModal(false)}>
          <div
            className="mx-auto w-96 rounded bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between border-b p-2">
              <p className=" font-semibold">Create New Server</p>
              <button onClick={() => setServerModal(false)}>
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
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
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
                placeholder="Server Name"
                className="my-2 w-full rounded border p-1 outline-none"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />

              <div className=" text-right">
                <button
                  onClick={handleUpload}
                  className="rounded bg-green-600 px-3 py-1 text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="">
        <div className="flex items-center justify-between rounded-t-md bg-slate-200 p-3 font-semibold">
          <p className="">Servers for {email}</p>
          <button
            onClick={() => setServerModal(true)}
            className="flex items-center gap-2 rounded py-2 px-2 font-semibold text-slate-800 "
          >
            <FontAwesomeIcon icon={faPlus} className="text-slate-800" />
            <p>New Server</p>
          </button>
        </div>

        <ul className="divide-y rounded-b-lg bg-white">
          {servers?.map((server: any) => {
            return (
              <li
                key={server.server.id}
                className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      style={{ objectFit: "cover" }}
                      src={server.server.image}
                      fill
                      alt=""
                      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{server.server.name}</p>
                    <div className="text-xs">
                      {server.server?._count?.members} members
                    </div>
                  </div>
                </div>
                <Link
                  href={{
                    pathname: `/server/[name]`,
                    query: {
                      id: server.server.id,
                      name: server.server.name,
                    },
                  }}
                  // as={`/server/${server.name}`}
                  className="rounded bg-slate-800 p-3 text-sm font-semibold uppercase text-white"
                >
                  Launch Server
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ServerList;
