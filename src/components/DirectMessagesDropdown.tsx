import * as React from "react";
import Image from "next/image";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface IUser {
  id: number;
  name: string;
  image: string;
}

const user1 = {
  id: 1,
  name: "Noel Vega",
  image: "/noelvega.jfif",
};

const user2 = {
  id: 2,
  name: "Michael Scott",
  image: "/michaelscott.jfif",
};

const user3 = {
  id: 3,
  name: "Dwight Shrute",
  image: "/dwightshrute.jfif",
};

const users = [user1, user2, user3];

const DirectMessageDropdown: React.FunctionComponent = () => {
  const [openDMs, setOpenDMs] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpenDMs(!openDMs)}
        className={`group flex cursor-pointer items-center gap-4 px-4 py-2`}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`transition-all duration-300 ${openDMs && "rotate-90"}`}
        />
        <p>Direct Messages</p>
      </div>

      <ul className="flex cursor-pointer flex-col ">
        {openDMs &&
          users.map((user) => {
            return (
              <li
                key={user.id}
                className="group py-2  pl-8 hover:bg-slate-600/30"
              >
                <div className="relative flex items-center ">
                  <div className="relative w-fit">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={user.image}
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="z-100 absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 bg-green-500 " />
                  </div>
                  <p className="px-4 text-sm group-hover:text-yellow-400">
                    {user.name}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DirectMessageDropdown;
