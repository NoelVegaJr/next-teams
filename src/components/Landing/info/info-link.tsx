import Link from "next/link";
import * as React from "react";

interface IInfoLinkProps {
  href: string;
  label: string;
}

const InfoLink: React.FunctionComponent<IInfoLinkProps> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-lg font-semibold text-cyan-600"
    >
      <div className="group  w-fit cursor-pointer ">
        <div className="flex items-center gap-2">
          {label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <div className="h-0.5 w-0 bg-cyan-600 transition-all duration-500 ease-in-out group-hover:w-full" />
      </div>
    </Link>
  );
};

export default InfoLink;
