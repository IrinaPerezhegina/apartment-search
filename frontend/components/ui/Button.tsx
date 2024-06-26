import Image from 'next/image';
import circle from '../../public/circle.png';

const Button = ({ onReset }:{ onReset: React.MouseEventHandler }) => (
  <div className="">
    <button onClick={onReset} type="button" className="flex items-center gap-3">
      <Image className="pb-1" src={circle} width={12} height={12} alt="" />
      <p className="text-md font-ev whitespace-nowrap text-[#040306]">Очистить все</p>
    </button>
  </div>
);

export default Button;
