import Image from 'next/image';
import like from '../public/like.png';
import apartment from '../public/apartment.png';

const Item = () => (
  <div className="pt-3 pb-12 px-12 w-1/3 rounded-base border ">
    <div className="flex justify-between items-center">
      <div className="text-text mb-2">
        <p className="pt-5 text-xl">1-комнатная 21,2 м2</p>
        <div className="flex items-center gap-x-[21px]">
          <p className="pt-2 text-4xl font-semibold flex-nowrap">4 040 000 ₽</p>
          <p className="pt-4 font-semibold text-xs line-through flex-nowrap">
            7 700 000 ₽
          </p>
        </div>
      </div>
      <div className="">
        <Image src={like} width={55} height={55} alt="" />
      </div>
    </div>
    <div className="flex justify-center pt-10">
      <Image src={apartment} width={165} height={287} alt="" />
    </div>
    <div className="pt-14 pb-1 flex justify-between items-center border-b-2">
      <p>Проект</p>
      <p>ЖК Мотивы</p>
    </div>
    <div className="pt-1 pb-1 flex justify-between items-center border-b-2">
      <p>Этаж</p>
      <p>2 из 14</p>
    </div>
    <div className="pt-2 flex justify-between items-center ">
      <p>Срок сдачи</p>
      <p>II квартал 2025</p>
    </div>
  </div>
);

export default Item;
