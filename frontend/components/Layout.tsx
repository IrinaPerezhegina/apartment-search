import { ReactNode } from 'react';
import Button from './ui/Button';
// import Image from 'next/image';
// import like from '../../public/';

const Layout = ({ children, total }:{ children:ReactNode, total:number }) => (
  <div className="flex flex-col border-b w-full min-h-[272px] ">
    <div className="flex-wrap justify-center gap-5 flex pt-[53px] pb-10">
      {children}

    </div>
    <div className=" flex gap-3 justify-between pt-2 pl-13 pr-2">
      <div className="pl-[210px]" />
      <div className="text-md font-ev text-[#040306]">
        Найдено
        {' '}
        {total}
        {' '}
        квартир
      </div>
      <div className="items-left"><Button /></div>
    </div>
  </div>
);

export default Layout;
