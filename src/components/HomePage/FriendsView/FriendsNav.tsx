import * as React from "react";
import Stack from "@/components/UI/Stack";
import Text from "@/components/UI/Text";

interface IFriendsNavProps {
  active: string;
  setActive: (tab: string) => void;
  pending: number;
}

const FriendsNav: React.FunctionComponent<IFriendsNavProps> = ({
  active,
  setActive,
  pending,
}) => {
  const navLinkBaseStyle = "cursor-pointer rounded px-2 hover:bg-slate-500";
  return (
    <nav className="flex  border-b border-b-slate-700 p-3 ">
      <Text className="border-r border-r-slate-500 px-4 font-bold text-slate-100">
        Friends
      </Text>
      <Stack type="row" gap={4} className="px-2 font-semibold text-slate-300 ">
        <li
          onClick={() => setActive("online")}
          className={`${navLinkBaseStyle} ${
            active === "online" && "bg-slate-500"
          }`}
        >
          Online
        </li>
        <li
          onClick={() => setActive("all")}
          className={`${navLinkBaseStyle} ${
            active === "all" && "bg-slate-500"
          }`}
        >
          All
        </li>
        <li
          onClick={() => setActive("pending")}
          className={`flex w-fit cursor-pointer items-center gap-2 rounded px-2 hover:bg-slate-500 ${
            active === "pending" && " bg-slate-500"
          }`}
        >
          Pending{" "}
          {pending !== 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600  text-white">
              {pending}
            </span>
          )}
        </li>
        <li
          onClick={() => setActive("blocked")}
          className={`${navLinkBaseStyle} ${
            active === "blocked" && "bg-slate-500"
          }`}
        >
          Blocked
        </li>
        <li
          onClick={() => setActive("addfriend")}
          className="cursor-pointer rounded bg-green-700 px-2 text-white"
        >
          Add Friend
        </li>
      </Stack>
    </nav>
  );
};

export default FriendsNav;
