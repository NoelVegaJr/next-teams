import { NextPageContext } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import * as React from "react";
import { useEffect, useState } from "react";

interface IProfilPageProps {}

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

const ProfilPage: React.FunctionComponent<IProfilPageProps> = ({
  user,
}: any) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log("change hand");
      setIndex((prev) => {
        if (index === hands.length) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 1000);
  }, []);
  console.log(index);
  return (
    <div className="h-screen bg-slate-800 ">
      <div className="mx-auto max-w-2xl">
        <p className="text-5xl">{hands[index]}</p>
        <p className="mb-8 text-5xl font-bold text-white">Welcome back</p>
        <div className="">
          <p className="rounded-t-md bg-slate-200 p-3 font-semibold">
            Servers for {user.user.email}
          </p>
          <div className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-3">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  style={{ objectFit: "cover" }}
                  src={"/defaultserver.png"}
                  fill
                  alt=""
                />
              </div>
              <div>
                <p className="font-bold">Server name here</p>
                <div className="text-xs">0 members</div>
              </div>
            </div>
            <button className="rounded bg-slate-800 p-3 text-sm font-semibold uppercase text-white">
              Launch Server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;
