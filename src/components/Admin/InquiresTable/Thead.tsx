import TheadCell from "@/components/UI/Table/TheadCell";

const Thead: React.FunctionComponent = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Company"
        />
        <TheadCell
          className={
            "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          }
          name="Inquirer"
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
      </tr>
    </thead>
  );
};

export default Thead;
