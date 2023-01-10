import type { ServerPreview } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import Text from "@/components/UI/Text";
import Stack from "@/components/UI/Stack";
import Tile from "@/components/UI/Tile";
import useHomeProfileStore from "store/home/profile-store";
import NewServerModal from "../Modals/NewServerModal";
import NewServerButton from "./NewServerButton";
import EmptyServerListNewServerButton from "./EmptyServerListNewServerButton";

const ServerList = ({
  username,
  initialServers,
}: {
  username: string;
  initialServers: ServerPreview[];
}) => {
  const profileStore = useHomeProfileStore();
  const [servers, setServers] = useState(initialServers);
  const serverListQuery = trpc.server.getAllByProfileId.useQuery({
    profileId: profileStore.profile.id,
  });

  useEffect(() => {
    if (serverListQuery.data) {
      setServers(serverListQuery.data);
    }
  }, [serverListQuery.data]);

  return (
    <>
      <div className="h-full sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Servers</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NewServerButton />
        </div>
      </div>
      <div className="shadow">
        <ul className="divide-y rounded-b-lg bg-white">
          {servers.map((server) => {
            return (
              <li
                key={server.id}
                className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
              >
                <Stack type="row" center gap={4}>
                  <Tile size="md" src={server.image} />
                  <div>
                    <Text weight="bold">{server.name}</Text>
                    <Text size="xs">{`${server._count.members} members`}</Text>
                  </div>
                </Stack>
                <Link
                  href={`/server/${server.id}`}
                  className="rounded bg-slate-800 p-3 text-sm font-semibold uppercase text-white"
                >
                  Launch Server
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {servers.length === 0 && <EmptyServerListNewServerButton />}
    </>
  );
};

export default ServerList;
