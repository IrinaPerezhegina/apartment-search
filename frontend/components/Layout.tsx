import { ReactNode } from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import filter from '../public/filter.png';
import close from '../public/close.png';

const Layout = (
  {
    resetParams,
    children, total,
    move,
    closeFilterMobile,
  }
  :{ move:boolean,
    children:ReactNode,
    total:number,
    resetParams: React.MouseEventHandler,
    closeFilterMobile: React.MouseEventHandler },
) => (
  <div className="justify-center flex flex-col max-sm:pl-1 border-b max-sm:border-none w-full max-sm:w-[335px] min-h-[272px] max-sm:min-h-[74px]">
    <div className={move ? 'max-sm:hidden' : 'flex'}>
      <h4 className="max-sm:text-2xl max-sm:font-semibold pt-1">
        ПЛАНИРОВКИ
      </h4>
    </div>
    <div className={!move ? 'max-sm:hidden hidden' : 'hidden'}>
      <div className="flex justify-end pt-1">
        <Image onClick={closeFilterMobile} className="" src={close} width={30} height={30} alt="" />
      </div>
      <h4 className="max-sm:text-2xl max-sm:pt-6">
        Фильтр
      </h4>
    </div>
    <div className={move ? 'justify-center  flex-wrap max-sm:gap-[35px] gap-5 flex pt-[53px] max-sm:pt-9 pb-10 max-sm' : 'hidden'}>
      {children}
    </div>
    <div className={!move && 'max-sm:hidden'}>
      <button type="button" onClick={closeFilterMobile} className="max-sm:mt-3 max-sm:mb-10 max-sm:w-[335px] max-sm:text-xs gap-1  max-sm:flex  cursor-pointer   hidden max-sm:h-[42px]  text-white bg-blue max-sm:rounded-base items-center justify-center">
        Смотреть квартиры
      </button>
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
    <div className={move ? 'max-sm:hidden hidden' : 'block'}>
      <div
        className="max-sm:mt-10 max-sm:mb-9 max-sm:w-[335px] max-sm:text-xs gap-1 max-sm:flex max-sm:h-[42px] justify-center text-white bg-blue max-sm:rounded-base"
      >
        <button type="button" onClick={closeFilterMobile} className="max-sm:w-full max-sm:h-full content-center flex  gap-2">
          <span>Фильтр</span>
          <Image className="" src={filter} width={14} height={16} alt="" />
        </button>
      </div>
    </div>
  </div>
);

export default Layout;
