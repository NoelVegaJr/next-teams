import axios from "axios";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/auth-context";
import { trpc } from "../utils/trpc";

export const getServerSideProps = async (ctx: NextPageContext) => {
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

  if (data?.user?.username) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }

  return { props: { userId: data.user.id } };
};

interface UserCreationProps {
  userId: string;
}

const UserCreationPage: React.FunctionComponent<UserCreationProps> = ({
  userId,
}) => {
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const updateUsernameHandler = async () => {
    console.log("props: ", userId);
    if (!username.trim() || !userId) return;
    console.log("attempting to create username");

    const res = await axios.put("/api/user/username", {
      username,
      userId,
    });

    userCtx.refetch();
    if (res.data.ok) {
      router.push("/UserCreation");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-600">
      <div className="flex w-72 flex-col gap-2">
        <p className="text-center text-2xl font-semibold text-slate-200">
          Username
        </p>
        <input
          type="text"
          placeholder="Username"
          className="w-full rounded p-1 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={updateUsernameHandler}
          className="rounded bg-indigo-500 py-2 px-4 font-semibold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserCreationPage;
