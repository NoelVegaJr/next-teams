import Modal from "@/components/UI/Modal";
import Text from "@/components/UI/Text";
import Tile from "@/components/UI/Tile";
import { IWorkspace } from "@/types/types";
import { s3FileUpload } from "@/utils/fileUpload";
import { trpc } from "@/utils/trpc";
import { faX, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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

const NewWorkspaceModal = ({
  close,
  profileId,
  serverId,
  setWorkspace,
  workspaceCount,
}: {
  close: () => void;
  profileId: string;
  serverId: string;
  setWorkspace: (workspace: IWorkspace) => void;
  workspaceCount: number;
}) => {
  const utils = trpc.useContext();
  const [name, setName] = useState("");
  const newWorkspaceMutation = trpc.server.createWorkspace.useMutation({
    onSuccess: () => {
      utils.server.getWorkspaceById.invalidate();
      utils.server.listWorkspacesByServerId.invalidate();
    },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("/defaultserver.png");

  const createWorkspaceHandler = async () => {
    const cleanName = name.trim();
    if (!cleanName) return;

    let newWorkspace;

    if (!imageFile) {
      newWorkspace = await newWorkspaceMutation.mutateAsync({
        profileId,
        serverId,
        name,
        image: "/defaultserver.png",
      });
    } else {
      const fileName = `serverAvatar.${imageFile.type.split("/")[1]}`;
      newWorkspace = await newWorkspaceMutation.mutateAsync({
        profileId,
        serverId,
        name,
        image: fileName,
      });

      if (newWorkspace?.id && newWorkspace.image !== "/defaultserver.png") {
        await s3FileUpload(imageFile, newWorkspace.id + "_" + fileName);
      }
    }
    if (newWorkspace) {
      setWorkspace(newWorkspace);
    }
    close();
  };

  return (
    <Modal
      close={() => {
        if (workspaceCount) {
          close();
        }
      }}
    >
      <div
        className="mx-auto w-96 rounded bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between border-b p-2">
          <Text weight="semibold">Create Workspace</Text>
          <button onClick={close}>
            <FontAwesomeIcon icon={faX} className="text-red-600" />
          </button>
        </div>
        <div className="p-2">
          <div className="group relative mx-auto w-fit cursor-pointer overflow-hidden rounded">
            <label htmlFor="serverImg" className=" w-full  text-white">
              <Tile size="5xl" src={imagePreview} />
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
            placeholder="Workspace Name"
            className="my-2 w-full rounded border p-1 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
  );
};

export default NewWorkspaceModal;
