import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import type {
  ConversationWithParticipants,
  Friend,
  ServerPreview,
} from "@/types/types";
import { prisma } from "@/server/db/client";
import type { Profile } from "@prisma/client";
import useHomeProfileStore from "store/home/profile-store";
import useHomeViewStore from "store/home/view-store";
import { usePusherPresence } from "hooks/pusher/presense-hook";
import useConversationStore from "store/home/openConversation-store";
import { Dialog, Transition } from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Avatar from "@/components/UI/Avatar";
import Staff from "../components/Staff/Staff";
import MobileSideNavigation from "@/components/Navigation/SideNavigation/MobileSideNavigation";
import DesktopSideNavigation from "@/components/Navigation/SideNavigation/DesktopSideNavigation";
import WorkSpace from "@/components/Project/Workspace/Workspace";
import Servers from "@/components/misc/ServersView/Servers";
import FileSystem from "@/components/FileSystem/FileSystem";
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

  // const profile = await prisma.profile.findUnique({
  //   where: { userId: session.user.id },
  // });

  // if (!profile?.username) {
  //   console.log("NO PROFILE");

  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/user-creation",
  //     },
  //     props: {},
  //   };
  // }

  // await prisma.profile.update({
  //   where: { userId: session.user.id },
  //   data: { status: "online" },
  // });
  // let conversations = await prisma.conversation.findMany({
  //   where: {
  //     participants: {
  //       some: {
  //         profileId: profile.id,
  //       },
  //     },
  //   },
  //   select: {
  //     id: true,
  //     participants: {
  //       select: {
  //         id: true,
  //         profile: true,
  //       },
  //     },
  //     messages: {
  //       select: {
  //         id: true,
  //         date: true,
  //         text: true,
  //         participant: {
  //           select: {
  //             id: true,
  //             profile: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  // conversations = JSON.parse(JSON.stringify(conversations));

  // return {
  //   props: {
  //     profile,
  //     conversations,
  //   },
  // };
  return { props: { profile: {} } };
};

export default function HomePage({
  profile,
  conversations,
  servers,
  friends,
}: {
  profile: Profile;
  conversations: ConversationWithParticipants[];
  servers: ServerPreview[];
  friends: Friend[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const profileStore = useHomeProfileStore();
  const viewStore = useHomeViewStore();
  const convoStore = useConversationStore();

  // usePusherPresence({
  //   userId: profile.id,
  //   clientId: "99e512a0e34c2dc7612d",
  //   cluster: "us2",
  //   endpoint: "http://localhost:3000/api/pusher/auth",
  //   name: "quickstart",
  //   transport: "ajax",
  // });

  useEffect(() => {
    profileStore.set(profile);
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <p className="text-lg font-semibold text-white">Phyper</p>
                  </div>
                  <MobileSideNavigation />
                </div>
                <div className="flex flex-shrink-0 bg-gray-700 p-4">
                  <a href="#" className="group block flex-shrink-0">
                    <div className="flex items-center">
                      {/* <Avatar
                        image={profileStore.profile.avatar}
                        size="sm"
                        username={profileStore.profile.username}
                        status={profileStore.profile.status}
                      /> */}
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                          {/* {profileStore.profile.username} */}
                        </p>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0"></div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <p className="text-lg font-semibold text-white">Phyper</p>
            </div>
            <DesktopSideNavigation />
          </div>
          <button className="group block w-full flex-shrink-0 bg-gray-700 p-4">
            <div className="flex items-center">
              {/* <Avatar
                image={profileStore.profile.avatar}
                size="sm"
                username={profileStore.profile.username}
                status={profileStore.profile.status}
              /> */}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {/* {profileStore.profile.username} */}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="flex h-screen flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-50 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main className="h-full flex-1 ">
          {viewStore.view === "Servers" && (
            <>
              <Servers />
            </>
          )}
          {viewStore.view === "Staff" && <Staff initialStaff={friends} />}
          {/* {viewStore.view === "Chat" && convoStore.conversationId && (
                <ChatView friends={friends} />
              )} */}
          {/* {viewStore.view === "Calendar" && <Calendar />} */}
          {viewStore.view === "Client" && <WorkSpace />}
          {viewStore.view === "Documents" && <FileSystem />}
        </main>
      </div>
    </div>
  );
}
