import { faPlus, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import Modal from "../Modal";
import { s3FileUpload } from "../../utils/fileUpload";
import { trpc } from "../../utils/trpc";
import { UserContext } from "../../context/auth-context";
import { getSession } from "next-auth/react";
import type { NextPageContext } from "next";

interface IServer {
  id: string;
  name: string;
  members: number;
  image: string;
}

const ServerList = ({ email, userId }: { email: string; userId: string }) => {
  const userCtx = useContext(UserContext);
  const [newServerModal, setServerModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [serverName, setServerName] = useState("");
  const serverMutation = trpc.server.create.useMutation();
  const servers = trpc.server.getAllByUserId.useQuery({ userId });

  const handleUpload = async () => {
    await s3FileUpload(imageFile);

    if (!userCtx?.user?.id) return;

    if (!imageFile) {
      serverMutation.mutate({
        userId: userCtx.user.id,
        name: serverName,
        image: "/defaultserver.png",
      });
    } else {
      serverMutation.mutate({
        userId: userCtx.user.id,
        name: serverName,
        image: imageFile.name,
      });
    }
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
          {servers.data?.map((server: any) => {
            return (
              <li
                key={server.id}
                className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      style={{ objectFit: "cover" }}
                      src={server.image}
                      fill
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="font-bold">{server.name}</p>
                    <div className="text-xs">{server.members} members</div>
                  </div>
                </div>
                <Link
                  href="/workspace"
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

const getServerSideProps = async (ctx: NextPageContext) => {
  const data = await getSession(ctx);
  if (!data?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }
};

export default ServerList;
