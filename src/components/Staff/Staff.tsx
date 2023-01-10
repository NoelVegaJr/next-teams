import type { Friend } from "@/types/types";
import { trpc } from "@/utils/trpc";
import { Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import useHomeProfileStore from "store/home/profile-store";
import StaffMemberRow from "./Table/StaffMemberRow";
import Thead from "./Table/Thead";

interface IStaffProps {
  initialStaff: Profile[];
}

const Staff: React.FunctionComponent<IStaffProps> = ({ initialStaff }) => {
  const profileStore = useHomeProfileStore();
  const [staffMembers, setStaffMembers] = useState<Profile[]>(initialStaff);

  const staffQuery = trpc.user.getStaffByCompanyId.useQuery({
    companyId: "1",
  });

  useEffect(() => {
    if (staffQuery.data) {
      setStaffMembers(staffQuery.data.members);
    }
  }, [staffQuery, staffMembers]);
  return (
    <>
      <div className="mx-auto mt-8  w-full max-w-6xl">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <Thead />
              <tbody className="divide-y divide-gray-200 bg-white">
                {staffMembers?.map((member) => {
                  return <StaffMemberRow profile={member} key={member.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
