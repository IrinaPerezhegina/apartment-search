/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { getTextAboutRooms } from '@/helper/getTextAboutRooms';
import { nanoid } from 'nanoid';

type CheckboxProps = {
  number: number
  is_active: boolean,
  disabled: boolean

};

const Checkbox = ({ rooms }:{ rooms:CheckboxProps[] }) => (
  <div className="ss">
    <p className="text-md text-grey font-ev">Укажите количество комнат</p>

    <div className="flex gap-5 justify-between pt-2">
      {rooms && rooms.map((room) => (
        <label key={nanoid()} className="flex items-center justify-center w-[70px] h-[55px] border-solid cursor-pointer border text-lg font-ev  border-black-100 rounded-base" htmlFor={room.number.toString()}>
          <p>{getTextAboutRooms(room.number)}</p>
          <input value={room.number} id={room.number.toString()} name={room.number.toString()} type="checkbox" className="hidden" />
        </label>

      ))}

    </div>
  </div>
);
export default Checkbox;
