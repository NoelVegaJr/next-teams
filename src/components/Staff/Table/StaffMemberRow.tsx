import Avatar from "@/components/UI/Avatar";
import type { Profile, Status } from "@prisma/client";
import * as React from "react";

interface IStaffMemberRowProps {
  profile: Profile;
}

const StaffMemberRow: React.FunctionComponent<IStaffMemberRowProps> = ({
  profile,
}) => {
  const { avatar, username, name, status } = profile;
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <Avatar
            image={avatar}
            size="xs"
            username={username}
            status={status}
          />
          <div className="ml-4">
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-gray-500">{name}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{"Developer"}</div>
        <div className="text-gray-500">{"Software and Development"}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          Active
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {"User"}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {name}</span>
        </a>
      </td>
    </tr>
  );
};

export default StaffMemberRow;
