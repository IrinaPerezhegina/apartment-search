import Image from 'next/image';
import { convertedDate } from '@/helper/convertedDate';
import { convertedNumber } from '@/helper/convertedNumber';
import { getTextAboutApartment } from '@/helper/getTextAboutApartment';
import like from '../public/like.png';
import apartment from '../public/apartment.png';

type ItemProps = {
  item: {
    id:number,
    project_title?:string,
    rooms:number,
    studio?:boolean,
    price:string,
    old_price: string,
    square:string,
    release_dates: string,
    floor: string,
    image: string,
  }
};

const Item = ({ item }:ItemProps) => (
  <div className=" pt-3 pb-12 max-sm:pb-2 px-10 max-sm:px-5 max-sm:pt-3 max-sm:w-[335px] w-[580px]   max-xs:h-[340px] rounded-base border max-sm:rounded-[6px] max-sm:text-2xxs border-[#040306]">
    <div className="flex justify-between items-center">
      <div className="text-text ">
        <p className="pt-4 max-sm:pt-1 text-xl max-sm:text-2xxs">
          {getTextAboutApartment(item.rooms, item.square)}
        </p>
        <div className="pt-2 max-sm:pt-1 flex items-center gap-x-[21px] max-sm:gap-x-[6px]">
          <p className=" text-4xl font-semibold flex-nowrap max-sm:text-md">
            { convertedNumber(item.price)}
          </p>
          <p className="pt-4 max-sm:pt-0 font-semibold text-xs max-sm:text-2xxs line-through flex-nowrap">
            { convertedNumber(item.old_price)}
          </p>
        </div>
      </div>
      <div className="cursor-pointer max-sm:w-[32px] max-sm:h-[32px]">
        <Image src={like} width={55} height={55} alt="" />
      </div>
    </div>
    <div className="flex justify-center pt-12 max-sm:pt-5">
      <Image src={apartment} alt="" className="flex items-center  max-sm:w-[88px] max-sm:h-[152px]" />
    </div>
    <div className="pt-14  max-sm:pt-7 pb-1 max-sm:pb-[2px] flex justify-between items-center border-b-2 max-sm:border-b-[0.58px]">
      <p className="text-grey">Проект</p>
      <p>ЖК Мотивы</p>
    </div>
    <div className="pt-1 pb-1 max-sm:pt-1 max-sm:pb-[2px] flex justify-between items-center border-b-2 max-sm:border-b-[0.58px]">
      <p className="text-grey">Этаж</p>
      <p>
        {item.floor}
        {' '}
        из 14
      </p>
    </div>
    <div className="pt-2 max-sm:pt-1 flex justify-between items-center max-sm:text-2xxs">
      <p className="text-grey ">Срок сдачи</p>
      <p>{(convertedDate(item.release_dates))}</p>
    </div>
  </div>
);

export default Item;
