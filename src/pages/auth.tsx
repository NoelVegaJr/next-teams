import { getSession, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import type { NextPageContext } from "next";
import { useEffect } from "react";

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
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="flex h-screen">
      <section className="flex w-1/2 items-center justify-center     px-20">
        <div className="w-4/5 rounded bg-white p-4">
          <div className="mb-8">
            <p className="text-3xl font-bold text-blue-900">
              Hi, Welcome Back!
            </p>
            <p className="text-xs text-slate-400">
              Start 14 day full-featured trial. No credit card required
            </p>
          </div>
          <div className="flex flex-col  ">
            <button
              onClick={() => signIn("google")}
              className="flex w-full items-center justify-center gap-4 rounded-3xl border-2 bg-white px-4 py-3 font-semibold text-slate-400"
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
            <div className=" my-4 flex items-center gap-4">
              <div className=" h-0.5 flex-1 bg-slate-300" />
              <p className="text-slate-400">Or, login with your email</p>
              <div className=" h-0.5 flex-1 bg-slate-300" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="font-semibold text-slate-500">
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="px- w-full rounded-3xl border-2 px-4 py-2  outline-none"
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
                  className="w-full rounded-3xl border-2 px-4 py-2  outline-none"
                />
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <p>Forgot Password ?</p>
              </div>
              <button className="flex w-full items-center justify-center gap-4 rounded-3xl  bg-blue-600 py-2 text-xl font-semibold text-white">
                {/* <FontAwesomeIcon icon={faLock} /> */}
                <p>Login</p>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        className="w-2/3
      bg-blue-400"
      ></section>
    </div>
  );
};

export default Auth;
