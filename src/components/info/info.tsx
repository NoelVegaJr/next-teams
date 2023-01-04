import Link from 'next/link';
import * as React from 'react';
import InfoHeader from './header';
import ImageView from './ImageView';

interface IInfoProps {
  children: JSX.Element | JSX.Element[];
}

const Info: React.FunctionComponent<IInfoProps> = (props) => {
  return (
    <article className='flex flex-col gap-4 lg:flex-row lg:gap-32 lg:items-center max-w-6xl mx-auto w-full'>
      {props.children}
    </article>
  );
};

export default Info;
