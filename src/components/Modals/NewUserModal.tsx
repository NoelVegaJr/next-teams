import * as React from "react";
import MyModal from "./Modal";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { trpc } from "@/utils/trpc";
import { NewUserSchema, NewUserSchemaType } from "@/types/inquiry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMeasure from "react-use-measure";
import { toast } from "react-hot-toast";

interface IAddUserModalProps {
  isOpen: boolean;
  close: () => void;
  companyId: string;
}

const NewUserModal: React.FunctionComponent<IAddUserModalProps> = ({
  isOpen,
  close,
  companyId,
}) => {
  const utils = trpc.useContext();
  const [ref, bound] = useMeasure();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewUserSchemaType>({ resolver: zodResolver(NewUserSchema) });

  const mutation = trpc.company.newUser.useMutation({
    onSuccess: (data) => {
      utils.admin.listAllCompanies.invalidate();
      toast.success(`Created new user ${data.data?.name}`);
    },
  });
  const submitHandler = (data: NewUserSchemaType) => {
    console.log(data);
    mutation.mutateAsync(data);
    close();
  };

  const handleChange = (address: string) => {
    setValue("address", address);
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then((results) => {
        setValue("address", results[0].formatted_address);
      })
      .then((latLng) => console.log(latLng))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MyModal title="Add User" close={close} isOpen={isOpen}>
      <div className="mt-10 sm:mt-0">
        <div className=" md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit(submitHandler)} className="w-full">
              <input value={companyId} {...register("companyId")} hidden />
              <div className=" ">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className=" flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="w-full">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        {...register("role")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone number
                      </label>
                      <input
                        type="text"
                        {...register("phone")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-12 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        {...register("email")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="street-address"
                        className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Street address
                      </label>
                      <div className="">
                        <PlacesAutocomplete
                          value={watch("address")}
                          onChange={handleChange}
                          onSelect={handleSelect}
                          debounce={750}
                          searchOptions={{
                            componentRestrictions: {
                              country: ["us", "ca"],
                            },
                          }}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...register("address")}
                                {...getInputProps({
                                  placeholder: "Search Places ...",
                                  className:
                                    "block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm group",
                                })}
                              />
                              <div
                                ref={ref}
                                className={`absolute  rounded-b border-2  ${
                                  bound.height > 5 && "border-indigo-500"
                                } bg-white`}
                              >
                                {loading && <div>Loading...</div>}
                                {suggestions.map(
                                  (suggestion, index: number) => {
                                    return (
                                      <div
                                        className=" px-2 py-1 hover:cursor-pointer hover:bg-gray-50"
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        key={index}
                                        {...getSuggestionItemProps(suggestion)}
                                      >
                                        <span>{suggestion.description}</span>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50  px-6 text-right">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MyModal>
  );
};

export default NewUserModal;
