const WorkspaceTabs = ({
  onChange,
  value,
}: {
  onChange: (tab: string) => void;
  value: string;
}) => {
  return (
    <ul className=" flex cursor-pointer divide-x divide-slate-500 bg-slate-600 text-center text-slate-100">
      <li
        onClick={() => onChange("chat")}
        className={`${
          value === "chat" && "bg-slate-600"
        } w-1/3 py-2 font-semibold hover:bg-slate-600/70`}
      >
        Chat
      </li>
      <li
        onClick={() => onChange("task board")}
        className={`${
          value === "task board" && "bg-slate-600"
        } w-1/3 py-2 font-semibold hover:bg-slate-600/70`}
      >
        Tasks Board
      </li>
      <li
        onClick={() => onChange("white board")}
        className={`${
          value === "task board" && "bg-slate-600"
        } w-1/3 py-2 font-semibold hover:bg-slate-600/70`}
      >
        White Board
      </li>
    </ul>
  );
};

export default WorkspaceTabs;
