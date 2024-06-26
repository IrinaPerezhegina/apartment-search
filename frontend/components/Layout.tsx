import { ReactNode } from 'react';
import Image from 'next/image';
import Button from './ui/Button';
import filter from '../public/filter.png';
import close from '../public/close.png';
import Spinner from './Spinner';

const Layout = (
  {
    resetParams,
    children, total,
    move,
    closeFilterMobile,
    status,
  }
  :{ move:boolean,
    children:ReactNode,
    total:number,
    status:boolean
    resetParams: React.MouseEventHandler,
    closeFilterMobile: React.MouseEventHandler },
) => (
  <div className="flex flex-col max-sm:pl-1 border-b max-sm:border-none w-full min-h-[350px] max-sm:min-h-[74px]">
    <div className={move ? 'max-sm:hidden' : 'flex'}>
      <h4 className="max-sm:text-2xl  text-9xl">
        ПЛАНИРОВКИ
      </h4>
    </div>
    <div className={!move ? 'max-sm:hidden hidden' : 'max-sm:block hidden'}>
      <div className="flex justify-end pt-1  ">
        <Image onClick={closeFilterMobile} className="" src={close} width={30} height={30} alt="" />
      </div>
      <h4 className="max-sm:text-2xl max-sm:pt-6">
        Фильтр
      </h4>
    </div>
    <div className={move ? 'max-sm:flex flex-wrap justify-center max-sm:gap-[35px] flex gap-5 pt-[53px] max-sm:pt-9 pb-10' : 'flex flex-wrap justify-center max-sm:gap-[35px] gap-5 pt-[53px] max-sm:pt-9 pb-10 max-sm:hidden '}>
      {children}
    </div>
    <div className={!move ? 'max-sm:hidden w-full' : 'w-full'}>
      <button type="button" onClick={closeFilterMobile} className="max-sm:mt-3 max-sm:mb-10 max-sm:w-full max-sm:text-xs gap-1 max-sm:flex  cursor-pointer  hidden max-sm:h-[42px]  text-white bg-blue max-sm:rounded-base items-center justify-center">
        Смотреть квартиры
      </button>
    </div>
    <div className="pt-2 max-sm:hidden grid grid-cols-7">
      <div className="text-md font-ev items-center text-[#040306] col-start-4 justify-self-end pr-2 flex">
        <span>
          Найдено
        </span>
        <Spinner status={status}>
          <span className="px-2">
            {total}
          </span>
        </Spinner>
        <span>
          квартир
        </span>
      </div>
      <div className="col-start-7 justify-self-end"><Button onReset={resetParams} /></div>
    </div>
    <div className={move ? 'max-sm:hidden hidden' : 'max-sm:block hidden'}>
      <div
        className="max-sm:mt-10 max-sm:mb-9 max-sm:text-xs gap-1 max-sm:flex max-sm:h-[42px] justify-center text-white bg-blue max-sm:rounded-base"
      >
        <button type="button" onClick={closeFilterMobile} className="max-sm:w-full max-sm:h-full flex justify-center pt-3 gap-1">
          <span>Фильтр</span>
          <Image className="pt-[1px]" src={filter} width={16} height={20} alt="" />
        </button>
      </div>
    </div>
  </div>
);

export default Layout;
