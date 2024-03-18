/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { getTextAboutRooms } from '@/helper/getTextAboutRooms';
import { nanoid } from 'nanoid';
import { ChangeEvent } from 'react';

type CheckboxProps = {
  number: number
  is_active: boolean,
  disabled: boolean

};

const Checkbox = ({
  rooms, onChange, name, value,
}:{ rooms:CheckboxProps[], onChange:Function, name:string, value:string }) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="ss">
      <p className="text-md text-grey font-ev">Укажите количество комнат</p>
      <div className="flex gap-5 justify-between pt-2">
        {rooms && rooms.map((room) => (
          <label key={nanoid()} htmlFor={room.number.toString()} className={value === room.number.toString() ? 'bg-blue flex items-center justify-center w-[70px] h-[55px]  cursor-pointer  text-lg font-ev  rounded-base text-white' : 'flex items-center justify-center w-[70px] h-[55px] border-solid cursor-pointer border text-lg font-ev  border-black-100 rounded-base'}>
            <p>{getTextAboutRooms(room.number)}</p>

            <input value={room.number} id={room.number.toString()} name={name} type="checkbox" className="hidden" onChange={handleChange} />
          </label>

        ))}

      </div>
    </div>
  );
};
export default Checkbox;
