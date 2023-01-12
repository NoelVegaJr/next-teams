import type { FormSchemaType } from "@/types/inquiry";
import { FormSchema } from "@/types/inquiry";
import { trpc } from "@/utils/trpc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMeasure from "react-use-measure";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

export default function SignUpForm() {
  const [ref, bound] = useMeasure();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

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

  const mutation = trpc.company.newInquiry.useMutation();
  const submitHandler = async (data: FormSchemaType) => {
    console.log(data);
    await mutation.mutateAsync(data);
  };

  return (
    <>
      <div className="bg-gray-50 p-20">
        <div className="mx-auto w-full max-w-5xl ">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-8 divide-y divide-gray-200 rounded-lg border bg-white p-10"
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Contact Form
                  </h3>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="username"
                      className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Company Name
                      {errors.companyName && (
                        <p className="text-xs text-red-500">
                          {errors.companyName.message}
                        </p>
                      )}
                    </label>

                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <div className="flex max-w-lg rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                          hyper.com/
                        </span>
                        <input
                          {...register("companyName")}
                          type="text"
                          id="companyName"
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-gray-200 ">
                    <label
                      htmlFor="name"
                      className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Name
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email address
                      {errors.email && (
                        <p className="text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="phone"
                      className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Phone number
                      {errors.phone && (
                        <p className="text-xs text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        id="phone"
                        type="text"
                        {...register("phone")}
                        className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="address"
                      className=" flex flex-col text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Street address
                      {errors.address && (
                        <p className="text-xs text-red-500">
                          {errors.address.message}
                        </p>
                      )}
                    </label>
                    <div className="mt-1 w-full sm:col-span-2 sm:mt-0">
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
                            <div className="relative w-full">
                              <div
                                ref={ref}
                                className={`absolute w-full rounded-b border-2  ${
                                  bound.height > 5 && "border-indigo-500"
                                } bg-white`}
                              >
                                {loading && <div>Loading...</div>}
                                {suggestions.map(
                                  (suggestion, index: number) => {
                                    return (
                                      <div
                                        className="w-full px-2 py-1 hover:cursor-pointer hover:bg-gray-50"
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
                          </div>
                        )}
                      </PlacesAutocomplete>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  disabled={formState.isSubmitting}
                  type="submit"
                  className="ml-3 inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
