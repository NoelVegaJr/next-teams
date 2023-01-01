import { getSession, signIn, useSession } from "next-auth/react";
import * as React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import type { NextPageContext } from "next";

export const getServerSideProps = async (context: NextPageContext) => {
  const user = await getSession(context);

  if (user?.user?.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
      props: {},
    };
  }
  return {
    props: { user },
  };
};

const Auth: React.FunctionComponent = () => {
  const { data: user } = useSession();
  React.useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="flex h-screen">
      <section className="w-1/3 border px-20">
        <div className="flex justify-between py-16">
          <p className="text-3xl font-bold text-indigo-700">Team Flow</p>
          <p className="font-semibold text-indigo-700 underline">Demo</p>
        </div>
        <div className="mb-8">
          <p className="text-3xl font-bold text-indigo-900">
            Hi, Welcome Back!
          </p>
          <p className="text-xs text-slate-400">
            Start 14 day full-featured trial. No credit card required
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="font-semibold text-slate-500">
                Email Address
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                className="w-full rounded border-2 px-1 py-1  outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="font-semibold text-slate-500"
              >
                Password
              </label>
              <input
                id="password"
                type="text"
                placeholder="Password"
                className="w-full rounded border-2 px-1 py-1 outline-none"
              />
            </div>
            <button className="flex w-full items-center justify-center gap-4 rounded-lg  bg-indigo-600 py-2 text-xl font-semibold text-white">
              <FontAwesomeIcon icon={faLock} />
              <p>Login</p>
            </button>
          </div>
          <div className=" flex items-center gap-4">
            <div className=" h-0.5 flex-1 bg-slate-300" />
            <p className="text-slate-400">Or, login with your email</p>
            <div className=" h-0.5 flex-1 bg-slate-300" />
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center gap-4 rounded-lg border-2 bg-white px-4 py-3 font-semibold text-slate-400"
          >
            <div className="relative flex h-6 w-6 items-center">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={"/google.png"}
                alt="google logo"
              />
            </div>
            Sign in with Google
          </button>
          <button
            onClick={() => signIn("google")}
            className="flex w-full items-center justify-center gap-4 rounded-lg border-2 bg-white px-4 py-3 font-semibold text-slate-400"
          >
            <div className="relative flex h-6 w-6 items-center">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={"/discord.png"}
                alt="discord logo"
              />
            </div>
            Sign in with Discord
          </button>
        </div>
      </section>
      <section className="w-2/3"></section>
    </div>
  );
};

export default Auth;
