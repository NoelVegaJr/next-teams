import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

interface IInvitation {
  id: string;
  type: string;
  name: string;
  sender: string;
}

const Invitations = ({ invitations }: { invitations: IInvitation[] }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between rounded-t-md bg-slate-200 p-3 font-semibold">
        <p className="">Invitations</p>
      </div>

      <ul className="divide-y rounded-b-lg bg-white">
        {invitations.map((invitation) => {
          return (
            <li
              key={invitation.id}
              className="flex items-center  justify-between gap-4 rounded-b-md bg-white p-4"
            >
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
                  {invitation.type === "Server" && (
                    <p className="text-sm font-semibold">{invitation.type}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {invitation.type === "Channel" && (
                      <FontAwesomeIcon icon={faHashtag} />
                    )}
                    <p>{invitation.name}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/workspace"
                className="rounded bg-slate-800 p-3 text-sm font-semibold uppercase text-white"
              >
                Accept Invite
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Invitations;
