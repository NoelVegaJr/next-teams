import * as React from 'react';

interface IHamburgerMenuProps {}

const HamburgerMenu: React.FunctionComponent<IHamburgerMenuProps> = (props) => {
  return (
    <button className='w-5 flex flex-col gap-1 lg:hidden'>
      <div className='w-full h-0.5 rounded-lg bg-white'></div>
      <div className='w-full h-0.5 rounded-lg bg-white'></div>
      <div className='w-full h-0.5 rounded-lg bg-white'></div>
    </button>
  );
};

export default HamburgerMenu;
