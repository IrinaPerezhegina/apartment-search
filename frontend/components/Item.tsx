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

  <div className=" pt-3 pb-12 px-10 w-[580px] rounded-base border ">
    <div className="flex justify-between items-center">
      <div className="text-text">
        <p className="pt-4 text-xl">
          {getTextAboutApartment(item.rooms, item.square)}

        </p>
        <div className=" pt-2 flex items-center gap-x-[21px]">
          <p className=" text-4xl font-semibold flex-nowrap">
            { convertedNumber(item.price)}
          </p>
          <p className="pt-4 font-semibold text-xs line-through flex-nowrap">
            { convertedNumber(item.old_price)}

          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <Image src={like} width={55} height={55} alt="" />
      </div>
    </div>
    <div className="flex justify-center pt-12">
      <Image src={apartment} width={165} height={287} alt="" />
    </div>
    <div className="pt-14 pb-1 flex justify-between items-center border-b-2">
      <p className="text-grey">Проект</p>
      <p>ЖК Мотивы</p>
    </div>
    <div className="pt-1 pb-1 flex justify-between items-center border-b-2">
      <p className="text-grey">Этаж</p>
      <p>
        {item.floor}
        {' '}
        из 14
      </p>
    </div>
    <div className="pt-2 flex justify-between items-center ">
      <p className="text-grey">Срок сдачи</p>
      <p>{(convertedDate(item.release_dates))}</p>
    </div>
  </div>
);

export default Item;
