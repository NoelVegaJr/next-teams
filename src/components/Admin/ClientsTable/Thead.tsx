import TheadCell from "@/components/UI/Table/TheadCell";

const Thead: React.FunctionComponent = () => {
  const styles = "px-3 py-3.5 text-left text-sm font-semibold text-gray-900";
  return (
    <thead className="bg-gray-50">
      <tr>
        <TheadCell className={styles} name="Company" />
        <TheadCell className={styles} name="Address" />
        <TheadCell className={styles} name="Phone" />
      </tr>
    </thead>
  );
};

export default Thead;
