import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";
import HamburgerMenu from "./hamburger-menu";

const HomeNavbar: React.FunctionComponent = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex  h-24 items-center justify-between gap-6  bg-slate-900 px-6 text-white">
      <div className="flex items-center gap-4 font-bold ">
        <p className="mr-6 text-3xl">Orderly</p>
        <div className="hidden gap-4 lg:flex ">
          <Link
            href="#"
            className="text-sm text-white  transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Product
          </Link>
          <Link
            href="#"
            className="text-sm text-white transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Solutions
          </Link>
          <Link
            href="#"
            className="text-sm text-white transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Enterprise
          </Link>
          <Link
            href="#"
            className="text-sm text-white transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Resources
          </Link>
          <Link
            href="#"
            className="text-sm text-white transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Pricing
          </Link>
        </div>
      </div>
      <HamburgerMenu />
      <div className="text-md hidden items-center gap-6 font-semibold lg:flex">
        {!session ? (
          <Link
            href="/auth"
            className="transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Sign In
          </Link>
        ) : (
          <button
            onClick={() => signOut()}
            className="transition-all duration-100 hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)]"
          >
            Log out
          </button>
        )}

        <Link
          href="#"
          className="rounded border p-2 transition-all duration-200 hover:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,255)]"
        >
          Talk to sales
        </Link>

        <Link
          href="auth"
          className="rounded border p-2 transition-all duration-200 hover:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,255)]"
        >
          Demo
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
