import * as React from "react";
import useHomeProfileStore from "@/store/home/profile-store";
import MyModal from "../MyDialog";
import { trpc } from "@/utils/trpc";
import type { FormEvent } from "react";
import { useContext, useState } from "react";
import convertToBase64 from "@/utils/convertToBase64";
import { s3FileUpload } from "@/utils/fileUpload";
import { Spinner } from "@/components/UI/Spinner";
import SuccessToast from "@/components/UI/Toasts/SuccessToast";
import { ToastContext } from "@/context/Toast-Context";

interface INewServerModalProps {
  isOpen: boolean;
  close: () => void;
}

const NewServerModal: React.FunctionComponent<INewServerModalProps> = ({
  isOpen,
  close,
}) => {
  const addToast = useContext(ToastContext);
  const profile = useHomeProfileStore().profile;
  const utils = trpc.useContext();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("/defaultserver.png");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const serverMutation = trpc.server.create.useMutation({
    onSuccess: (data) => {
      utils.server.getAllByProfileId.invalidate();
      setLoading(false);
      close();
      addToast(<SuccessToast text={`Server ${data?.name ?? ""} created`} />);
    },
    onError: () => {
      utils.server.getAllByProfileId.invalidate();
      setLoading(false);
    },
  });
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const cleanName = name.trim();
    if (!cleanName) return;
    if (!imageFile) {
      await serverMutation.mutateAsync({
        profileId: profile.id,
        name: cleanName,
        image: "/defaultserver.png",
      });
    } else {
      const fileName = `serverAvatar.${imageFile.type.split("/")[1]}`;
      const server = await serverMutation.mutateAsync({
        profileId: profile.id,
        name: cleanName,
        image: fileName,
      });
      if (server?.id && server.image !== "/defaultserver.png") {
        await s3FileUpload(imageFile, server.id + "_" + fileName);
      }
    }
    setName("");
    // close();
  };

  return (
    <MyModal isOpen={isOpen} close={close} title="New Server">
      {loading ? (
        <>
          <div className="flex flex-col items-center gap-6">
            <p>Creating your new server</p>
            <Spinner size={16} thickness={8} />
            <p>This should only take a moment... 🚀</p>
          </div>
        </>
      ) : (
        <form onSubmit={submitHandler} className="mt-1 sm:col-span-2 sm:mt-0">
          <div className="flex  justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    hidden
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
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Server Name"
              className="my-2 w-full rounded border p-1 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </MyModal>
  );
};

export default NewServerModal;
