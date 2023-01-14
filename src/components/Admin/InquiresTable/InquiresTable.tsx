import Tbody from "./Tbody";
import Thead from "./Thead";

const InquiresTable: React.FunctionComponent = () => {
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
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <Thead />
                <Tbody />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiresTable;
