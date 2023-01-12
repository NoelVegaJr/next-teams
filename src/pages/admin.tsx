import { trpc } from "@/utils/trpc";
import * as React from "react";

const AdminPage: React.FunctionComponent = (props) => {
  const utils = trpc.useContext();
  const inqueriesQuery = trpc.company.getInquiries.useQuery();
  const newCompanyMutation = trpc.company.new.useMutation({
    onSuccess: () => {
      utils.company.getInquiries.invalidate();
    },
  });

  const createCompanyHandler = async (data: {
    name: string;
    address: string;
    phone: string;
    inquiryId: string;
  }) => {
    await newCompanyMutation.mutateAsync(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Inquires</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all sign up inquires.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Inquirer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {inqueriesQuery.data?.inqueries
                    ?.filter((i) => i.status === "pending")
                    .map((i) => (
                      <tr key={i.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {i.companyName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {i.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {i.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {i.phone}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {i.status}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
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
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   {inqueriesQuery.data?.inqueries?.map((i) => {
    //     return (
    //       <li key={i.id}>
    //         <p>{i.companyName}</p>
    //         <button
    //           onClick={() =>
    //             createCompanyHandler({
    //               name: i.companyName,
    //               address: i.address,
    //               phone: i.phone,
    //             })
    //           }
    //         >
    //           Create
    //         </button>
    //       </li>
    //     );
    //   })}
    // </div>
  );
};

export default AdminPage;
