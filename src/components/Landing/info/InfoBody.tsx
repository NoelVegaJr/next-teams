import * as React from 'react';

interface IInfoBodyProps {
  children: JSX.Element | JSX.Element[];
}

const InfoBody: React.FunctionComponent<IInfoBodyProps> = (props) => {
  return <div className='flex flex-col gap-4 lg:w-1/2'>{props.children}</div>;
};

export default InfoBody;
