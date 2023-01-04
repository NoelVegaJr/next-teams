import { faPlus, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "@/components/UI/Modal";
import { s3FileUpload } from "@/utils/fileUpload";
import { trpc } from "@/utils/trpc";
import type { ServerPreview } from "@/types/types";
import Text from "@/components/UI/Text";
import Stack from "@/components/UI/Stack";
import Tile from "@/components/UI/Tile";
import type { Profile } from "@prisma/client";

const convertToBase64 = (file: File) => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader();
    if (!file) {
      alert("please select an image");
    } else {
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    }
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const ServerList = ({
  username,
  initialServers,
  profile,
}: {
  username: string;
  profile: Profile;
  initialServers: ServerPreview[];
}) => {
  const utils = trpc.useContext();
  const [servers, setServers] = useState(initialServers);
  const serverListQuery = trpc.server.getAllByProfileId.useQuery({
    profileId: profile.id,
  });
  const [newServerModal, setServerModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("/defaultserver.png");
  const [serverName, setServerName] = useState("");
  const serverMutation = trpc.server.create.useMutation({
    onSuccess: () => {
      utils.server.getAllByProfileId.invalidate();
    },
  });

  useEffect(() => {
    if (serverListQuery.data) {
      setServers(serverListQuery.data);
    }
  }, [serverListQuery.data]);

  const handleUpload = async () => {
    const cleanServerName = serverName.trim();
    if (!cleanServerName) return;

    if (!imageFile) {
      serverMutation.mutate({
        profileId: profile.id,
        name: serverName,
        image: "/defaultserver.png",
      });
    } else {
      const fileName = `serverAvatar.${imageFile.type.split("/")[1]}`;
      const server = await serverMutation.mutateAsync({
        profileId: profile.id,
        name: serverName,
        image: fileName,
      });
      if (server?.id && server.image !== "/defaultserver.png") {
        await s3FileUpload(imageFile, server.id + "_" + fileName);
      }
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
                      src={imagePreview}
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
                    onChange={async (e) => {
                      const files = e.target.files as FileList;
                      if (files[0]) {
                        const base64 = await convertToBase64(files[0]);
                        if (typeof base64 === "string") {
                          setImageFile(files[0]);
                          setImagePreview(base64);
                        }
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
        <Stack
          type="row"
          center
          className="justify-between rounded-t-md bg-slate-200 p-3 "
        >
          <Text weight="semibold">{`Servers for ${username}`}</Text>
          <button
            onClick={() => setServerModal(true)}
            className="flex items-center gap-2 rounded py-2 px-2 font-semibold text-slate-800 "
          >
            <FontAwesomeIcon icon={faPlus} className="text-slate-800" />
            <Text>New Server</Text>
          </button>
        </Stack>

        <ul className="divide-y rounded-b-lg bg-white">
          {servers.map((server) => {
            return (
              <li
                key={server.id}
                className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
              >
                <Stack type="row" center gap={4}>
                  <Tile size="md" src={server.image} />
                  <div>
                    <Text weight="bold">{server.name}</Text>
                    <Text size="xs">{`${server._count.members} members`}</Text>
                  </div>
                </Stack>
                <Link
                  href={`/server/${server.id}`}
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
