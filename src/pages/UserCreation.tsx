import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { prisma } from "@/server/db/client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { s3FileUpload } from "@/utils/fileUpload";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);

  if (!session?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },

      props: {},
    };
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });

  if (profile) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  return { props: { userId: session.user.id } };
};

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

interface UserCreationProps {
  userId: string;
}

type Inputs = {
  name: string;
  username: string;
  avatar: FileList;
  banner: FileList;
};

const UserCreationPage: React.FunctionComponent<UserCreationProps> = ({
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const createProfileMutation = trpc.user.createProfile.useMutation();

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, username, banner, avatar } = data;
    const clean_username = username.trim();
    const clean_name = name.trim();

    if (!username || !name) return;

    const bucketBaseUrl = "https://codeforktestbucket.s3.amazonaws.com/";
    const bannerFile = banner[0];
    const avatarFile = avatar[0];

    const bannerFileName =
      bannerFile && `${userId}_banner.${bannerFile.type.split("/")[1]}`;

    const avatarFileName =
      avatarFile && `${userId}_avatar.${avatarFile.type.split("/")[1]}`;

    const response = await createProfileMutation.mutateAsync({
      username: clean_username,
      name: clean_name,
      userId,
      avatar: bannerFileName ? bucketBaseUrl + avatarFileName : "default",
      banner: avatarFileName ? bucketBaseUrl + bannerFileName : "default",
    });

    if (response.success) {
      avatarFileName && (await s3FileUpload(avatarFile, avatarFileName));
      bannerFileName && (await s3FileUpload(bannerFile, bannerFileName));
      router.push("/home");
    }
  };

  const inputStylesBase = "rounded-md border-2 w-full outline-none p-1";

  return (
    <div className="grid h-screen place-content-center">
      <p className="mb-4 text-2xl font-semibold">Create your profile</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-10 overflow-hidden rounded-lg border-2 bg-gray-50 shadow-xl"
      >
        <div className="relative h-32 ">
          <label
            htmlFor="banner"
            className="group relative block   h-full w-full cursor-pointer overflow-hidden  "
          >
            <div className="opacity duration absolute top-0 left-0  grid h-full w-full place-content-center transition-all  group-hover:bg-black/20 group-hover:opacity-100 group-hover:blur-sm">
              {bannerImage ? (
                <>
                  <Image
                    src={bannerImage}
                    alt="banner"
                    fill
                    style={{ objectFit: "cover" }}
                    className="z-0 "
                  />
                </>
              ) : (
                <div className="absolute top-0 left-0 z-50 h-full w-full bg-indigo-600 transition-all duration-200 group-hover:blur-sm" />
              )}
            </div>
            <FontAwesomeIcon
              icon={faUpload}
              className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-3xl text-white opacity-0 drop-shadow-2xl transition-all duration-200 group-hover:opacity-100 "
            />

            <input
              hidden
              id="banner"
              type="file"
              {...register("banner", {
                onChange: async (e) => {
                  const files = e.target.files as FileList;
                  if (files[0]) {
                    const base64 = await convertToBase64(files[0] as File);
                    if (typeof base64 === "string") {
                      setBannerImage(base64);
                    }
                  }
                },
              })}
            />
          </label>
          <label
            htmlFor="avatar"
            className=" group absolute bottom-0  z-50 grid h-24 w-24 translate-y-1/2 translate-x-1/4 cursor-pointer place-content-center overflow-hidden  rounded-full border-4 border-white  bg-slate-800"
          >
            <div className="opacity duration absolute top-0 left-0  grid h-full w-full place-content-center transition-all  group-hover:bg-black/20 group-hover:opacity-100 group-hover:blur-sm">
              {avatarImage ? (
                <>
                  <Image
                    src={avatarImage}
                    alt="avatar"
                    fill
                    style={{ objectFit: "cover" }}
                    className="z-0 "
                  />
                </>
              ) : (
                <>
                  <div className="absolute z-10 grid h-full w-full place-content-center bg-slate-800 transition-all duration-100 group-hover:blur-sm">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-3xl text-white"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="text-2xl text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100"
                  />
                </>
              )}
            </div>
            <FontAwesomeIcon
              icon={faUpload}
              className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl text-white opacity-0 drop-shadow-2xl transition-all duration-200 group-hover:opacity-100 "
            />

            <input
              hidden
              id="avatar"
              type="file"
              {...register("avatar", {
                onChange: async (e) => {
                  const files = e.target.files as FileList;
                  if (files[0]) {
                    const base64 = await convertToBase64(files[0] as File);
                    if (typeof base64 === "string") {
                      setAvatarImage(base64);
                    }
                  }
                },
              })}
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div>
            <div className="flex justify-between">
              <label htmlFor="name">Name</label>
              {errors.name && (
                <span className="ml-2 text-xs text-red-600">required</span>
              )}
            </div>
            <input
              id="name"
              type="text"
              className={inputStylesBase}
              {...register("name", { required: true, maxLength: 50 })}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="username">Username</label>
              {errors.username && (
                <span className="ml-2 text-xs text-red-600">required</span>
              )}
            </div>
            <input
              id="username"
              type="text"
              className={inputStylesBase}
              {...register("username", { required: true, maxLength: 50 })}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-1 text-white drop-shadow-md active:drop-shadow-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreationPage;
