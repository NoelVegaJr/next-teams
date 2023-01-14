import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { ToastContextProvider } from "@/context/Toast-Context";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <>
        <Script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA8ml6U7DlQtEgqfsxzD7GLegi1ieALNqY&libraries=places`}
        />
        <Component {...pageProps} />
        <Toaster />
      </>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
