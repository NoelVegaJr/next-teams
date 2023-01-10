import type { FunctionComponent } from "react";

const TheadRow = ({ name }: { name: string }) => {
  return (
    <th
      scope="col"
      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
    >
      {name}
    </th>
  );
};

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
        <TheadRow name="Title" />
        <TheadRow name="Status" />
        <TheadRow name="Role" />
        <TheadRow name="Edit" />
      </tr>
    </thead>
  );
};

export default Thead;
