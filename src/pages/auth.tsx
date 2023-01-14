import { getSession, signIn, useSession } from "next-auth/react";
import type { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";

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
  const [email, setEmail] = useState("");
  const exists = trpc.auth.profileExists.useMutation();

  const signInHandler = async () => {
    if (!email) {
      return toast.error("Please enter an email");
    }
    const profileExists = await exists.mutateAsync({ email });

    if (profileExists.exists) {
      await signIn("email", { email, redirect: false });
      toast.success("Login link sent to your email");
    } else {
      toast.error("Login failed");
    }
  };
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
            <div className="flex flex-col gap-4">
              <div>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && signInHandler()}
                  className="px- w-full rounded-3xl border-2 px-4 py-2  outline-none"
                />
              </div>

              <button
                onClick={signInHandler}
                className="flex w-full items-center justify-center gap-4 rounded-3xl  bg-blue-600 py-2 text-xl font-semibold text-white"
              >
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
