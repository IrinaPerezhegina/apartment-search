import { ReactNode } from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import filter from '../public/filter.png';

const Layout = (
  {
    resetParams,
    children, total,
  }
  :{ children:ReactNode, total:number, resetParams: React.MouseEventHandler },
) => (
  <div className="flex max-sm:justify-center flex-col border-b max-sm:border-none w-full max-sm:w-[335px] min-h-[272px] max-sm:min-h-[74px]">

    <div className="flex-wrap justify-center  gap-5 flex pt-[53px] pb-10 max-sm:hidden">
      {children}
    </div>
    <div className=" flex gap-3 justify-between pt-2 pl-13 pr-2 max-sm:hidden">

      <div className="text-md font-ev text-[#040306]">
        Найдено
        {' '}
        {total}
        {' '}
        квартир
      </div>
      <div className="items-left"><Button onReset={resetParams} /></div>
    </div>
    <div className="hidden">
      <div className="max-sm:mt-8 max-sm:mb-8 max-sm:w-[300px] max-sm:text-xs gap-1  max-sm:flex  cursor-pointer   hidden max-sm:h-[42px]  text-white bg-blue max-sm:rounded-base items-center justify-center">
        <button type="button">Фильтр</button>
        <Image className="" src={filter} width={14} height={16} alt="" />
      </div>
    </div>
  </div>
);

export default Layout;
