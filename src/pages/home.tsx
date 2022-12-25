import type { NextPageContext } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/auth-context";
import ServerList from "../components/HomePage/ServerList";
import Invitations from "../components/HomePage/Invitations";
import { trpc } from "../utils/trpc";

interface IServer {
  id: string;
  name: string;
  members: number;
  image: string;
}

const servers: IServer[] = [
  { id: "1", name: "Server 1", members: 13, image: "/defaultserver.png" },
  { id: "2", name: "Server 2", members: 57, image: "/defaultserver.png" },
];

interface IInvitation {
  id: string;
  type: string;
  name: string;
  sender: string;
}

const invitations: IInvitation[] = [
  { id: "1", type: "Channel", name: "Human Resources", sender: "Tommy Nicks" },
  { id: "2", type: "Channel", name: "Product", sender: "Tommy Nicks" },
  { id: "3", type: "Server", name: "Dunder Mifflin", sender: "Michael Scott" },
];

export const getServerSideProps = async (context: NextPageContext) => {
  const user = await getSession(context);

  if (!user?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }
  console.log(user);
  return {
    props: { user },
  };
};

const hands = ["👋", "👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"];

const HomePage: React.FunctionComponent = () => {
  const userCtx = useContext(UserContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => {
        if (prev === hands.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });

      return () => {
        clearTimeout(id);
      };
    }, 1000);
  }, [index]);
  return (
    <div className="min-h-screen bg-slate-800 pb-20">
      <nav className="fixed top-0 mb-20 flex w-full items-center justify-between gap-20 bg-slate-900 py-4 pl-32 pr-12 text-slate-100">
        <div className="flex items-center gap-20">
          <p className="text-2xl font-bold">Team Flow</p>
          <ul className="flex gap-8   ">
            <li>Product</li>
            <li>Solutions</li>
            <li>Resources</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          {userCtx?.user?.image && (
            <Image src={userCtx.user.image} alt="profile pic" fill />
          )}
        </div>
      </nav>

      <div className="mx-auto  max-w-4xl pt-32">
        <div className="mb-12">
          <div className="flex gap-4">
            <p className="mb-4 text-5xl">{hands[index]}</p>
            <p className="mb-8 text-5xl font-bold text-white">Welcome back</p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {userCtx?.user?.email && (
            <>
              <ServerList userId={userCtx.user.id} email={userCtx.user.email} />
              <Invitations invitations={invitations} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
