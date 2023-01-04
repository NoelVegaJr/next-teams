import * as React from 'react';

interface IInfoHeaderProps {
  children: JSX.Element | string;
}

const InfoHeader: React.FunctionComponent<IInfoHeaderProps> = (props) => {
  return <p className='text-3xl lg:text-5xl font-bold'>{props.children}</p>;
};

export default InfoHeader;
