import MyModal from "@/components/Modals/Modal";
import { ICreateCompanySchema } from "@/types/mutationSchemas";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

const Tbody: React.FunctionComponent = () => {
  const utils = trpc.useContext();
  const [openModal, setOpenModal] = useState(false);
  const inqueriesQuery = trpc.company.getInquiries.useQuery();
  const newCompanyMutation = trpc.company.new.useMutation({
    onSuccess: () => {
      utils.company.getInquiries.invalidate();
      utils.admin.listAllCompanies.invalidate();
    },
  });

  const createCompanyHandler = async (data: ICreateCompanySchema) => {
    await newCompanyMutation.mutateAsync(data);
    setOpenModal(false);
  };

  const styles = "whitespace-nowrap px-3 py-4 text-sm text-gray-500";

  return (
    <>
      <tbody className="divide-y divide-gray-200 bg-white">
        {inqueriesQuery.data?.inqueries
          ?.filter((i) => i.status === "pending")
          .map((i) => (
            <>
              <MyModal
                title={`Inquiry: ${i.companyName}`}
                close={() => setOpenModal(false)}
                isOpen={openModal}
              >
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      createCompanyHandler({
                        address: i.address,
                        inquiryId: i.id,
                        name: i.companyName,
                        phone: i.phone,
                      })
                    }
                    className="rounded bg-green-600 py-1 px-2 text-white"
                  >
                    Create
                  </button>
                  <button className="rounded bg-red-600 py-1 px-2 text-white">
                    Deny
                  </button>
                </div>
              </MyModal>
              <tr
                onClick={() => setOpenModal(true)}
                key={i.id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {i.companyName}
                </td>
                <td className={styles}>{i.name}</td>
                <td className={styles}>{i.email}</td>
                <td className={styles}>{i.phone}</td>
                <td className={styles}>{i.status}</td>
                {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <button
              onClick={() =>
                createCompanyHandler({
                  address: i.address,
                  inquiryId: i.id,
                  name: i.companyName,
                  phone: i.phone,
                })
              }
              className="rounded bg-green-600 py-1 px-2 text-white hover:bg-green-500"
              >
              Create
              </button>
            </td> */}
              </tr>
            </>
          ))}
      </tbody>
    </>
  );
};

export default Tbody;
