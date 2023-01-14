const WorkspaceTabs = ({
  onChange,
  current,
}: {
  onChange: (tab: string) => void;
  current: string;
}) => {
  return (
    <ul className=" flex cursor-pointer divide-x divide-slate-500 bg-slate-600 text-center text-slate-100">
      <li
        onClick={() => onChange("chat")}
        className={`${
          current === "chat" && "bg-slate-600"
        } w-1/4 py-2 font-semibold hover:bg-slate-600/70`}
      >
        Chat
      </li>
      <li
        onClick={() => onChange("task board")}
        className={`${
          current === "task board" && "bg-slate-600"
        } w-1/4 py-2 font-semibold hover:bg-slate-600/70`}
      >
        Tasks Board
      </li>
      <li
        onClick={() => onChange("white board")}
        className={`${
          current === "task board" && "bg-slate-600"
        } w-1/4 py-2 font-semibold hover:bg-slate-600/70`}
      >
        White Board
      </li>
      <li
        onClick={() => onChange("servers")}
        className={`${
          current === "servers" && "bg-slate-600"
        } w-1/4 py-2 font-semibold hover:bg-slate-600/70`}
      >
        Servers
      </li>
    </ul>
  );
};

export default WorkspaceTabs;
