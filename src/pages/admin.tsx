import ClientsTable from "@/components/Admin/ClientsTable/ClientsTable";
import InquiresTable from "@/components/Admin/InquiresTable/InquiresTable";
import { SideNavButton } from "@/components/Navigation/Buttons/SideNavButton";
import { useState } from "react";

const viewMap: Record<string, JSX.Element> = {
  Inquires: <InquiresTable />,
  Clients: <ClientsTable />,
};

const AdminPage: React.FunctionComponent = (props) => {
  const [view, setView] = useState("Inquires");
  return (
    <div className="flex h-screen flex-col gap-6 ">
      <div className="flex h-full">
        <nav className="h-full w-52 bg-gray-900 p-2">
          <button
            className="w-full rounded py-1 px-2 text-left text-white transition-all duration-200 hover:bg-gray-800"
            onClick={() => setView("Inquires")}
          >
            Inquires
          </button>
          <button
            className="w-full rounded py-1 px-2 text-left text-white transition-all duration-200 hover:bg-gray-800"
            onClick={() => setView("Clients")}
          >
            Clients
          </button>
        </nav>

        {viewMap[view]}
      </div>
    </div>
  );
};

export default AdminPage;
