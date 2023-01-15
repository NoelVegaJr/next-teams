import MyModal from "@/components/Modals/Modall";
import NewUserModal from "@/components/Modals/NewUserModal";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const Tbody: React.FunctionComponent = () => {
  const companiesQuery = trpc.admin.listAllCompanies.useQuery();
  const [openModal, setOpenModal] = useState(false);

  const styles =
    "whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 sm:pl-6";
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {companiesQuery.data?.companies?.map((c) => (
        <>
          <NewUserModal
            close={() => setOpenModal(false)}
            isOpen={openModal}
            companyId={c.id}
          />

          <tr
            onClick={() => setOpenModal(true)}
            key={c.id}
            className="hover:cursor-pointer"
          >
            <td className={styles}>{c.name}</td>
            <td className={styles}>{c.address}</td>
            <td className={styles}>{c.phone}</td>
          </tr>
        </>
      ))}
    </tbody>
  );
};

export default Tbody;
