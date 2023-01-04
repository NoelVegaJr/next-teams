import Link from "next/link";
import * as React from "react";

interface IInfoLinkProps {
  href: string;
  label: string;
}

const InfoLink: React.FunctionComponent<IInfoLinkProps> = ({ href, label }) => {
  return (
    <li className=" w-full md:mb-4">
      <Link href={href} className="w-full py-2 hover:text-cyan-700">
        {label}
      </Link>
    </li>
  );
};

export default InfoLink;
