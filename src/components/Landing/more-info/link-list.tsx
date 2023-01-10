import * as React from 'react';
import { useState } from 'react';
import InfoLink from './info-link';

interface ILinkListProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const LinkList: React.FunctionComponent<ILinkListProps> = ({
  title,
  children,
}) => {
  const [showList1, setShowList1] = useState(false);

  return (
    <div>
      <button
        className='flex justify-between py-2 font-semibold uppercase w-full md:hidden'
        onClick={() => setShowList1(!showList1)}
      >
        {title}
        <span className={`text-lg ${showList1 ? 'rotate-90' : ''}`}>&gt;</span>
      </button>
      <p className='hidden md:block font-semibold uppercase'>{title}</p>
      <ul
        className={`${
          showList1 ? 'block' : 'hidden'
        } flex flex-col gap-4 text-sm md:block  `}
      >
        {children}
      </ul>
    </div>
  );
};

export default LinkList;
