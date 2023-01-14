import Avatar from "@/components/UI/Avatar";
import type { Profile, Status } from "@prisma/client";

interface IStaffMemberRowProps {
  profile: Profile;
}

const StaffMemberRow: React.FunctionComponent<IStaffMemberRowProps> = ({
  profile,
}) => {
  const { avatar, name, status, role, email, phone } = profile;
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <Avatar image={avatar} size="xs" name={name} status={status} />
          <div className="ml-4">
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-gray-500">{name}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{role}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{email}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <div className="text-gray-900">{phone}</div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
          {status}
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {"User"}
      </td>
    </tr>
  );
};

export default StaffMemberRow;
