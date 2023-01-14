import type { FunctionComponent } from "react";
import TheadCell from "@/components/UI/Table/TheadCell";

const Thead: FunctionComponent = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          Name
        </th>
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Role"
        />
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Email"
        />
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Phone"
        />
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Status"
        />
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Role"
        />
      </tr>
    </thead>
  );
};

export default Thead;
