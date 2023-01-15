import * as React from "react";

const MessageLoading: React.FunctionComponent = () => {
  return (
    <div className=" w-full  rounded-md   p-4 ">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 w-32 rounded bg-gray-300"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-1 h-2 rounded bg-gray-300"></div>
              <div className="col-span-1 h-2 rounded bg-gray-300"></div>
              <div className="col-span-1 h-2 rounded bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 h-2 rounded bg-gray-300"></div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 h-2 rounded bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLoading;
