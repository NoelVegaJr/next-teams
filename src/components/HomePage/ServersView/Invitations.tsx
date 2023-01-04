import * as React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import Stack from "@/components/UI/Stack";
import Tile from "@/components/UI/Tile";
import Text from "@/components/UI/Text";

interface IInvitation {
  id: string;
  type: string;
  name: string;
  sender: string;
}

const Invitations = ({ invitations }: { invitations: IInvitation[] }) => {
  return (
    <div className="">
      <div className="rounded-t-md bg-slate-200 p-3 font-semibold">
        <p className="">Invitations</p>
      </div>

      <Stack className="divide-y rounded-b-lg bg-white">
        {invitations.map((invitation) => {
          return (
            <li
              key={invitation.id}
              className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
            >
              <Stack type="row" center>
                <Tile src="/defaultserver.png" size="md" />
                <div>
                  {invitation.type === "Server" && (
                    <Text weight="semibold" size="sm">
                      {invitation.type}
                    </Text>
                  )}
                  <Stack type="row" center>
                    <>
                      {invitation.type === "Channel" && (
                        <FontAwesomeIcon icon={faHashtag} />
                      )}
                      <Text weight="semibold">{invitation.name}</Text>
                    </>
                  </Stack>
                </div>
              </Stack>
              <Link
                href="/workspace"
                className="rounded bg-slate-800 p-3 text-sm font-semibold uppercase text-white"
              >
                Accept Invite
              </Link>
            </li>
          );
        })}
      </Stack>
    </div>
  );
};

export default Invitations;
