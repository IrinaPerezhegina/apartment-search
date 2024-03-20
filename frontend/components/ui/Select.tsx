/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, memo } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import arrow from '../../public/arrow.png';

type SelectProps = {
  id: number
  title: string,
  is_active: boolean,
  disabled: boolean

};

const Select = ({
  projects, onChange, name, value,
}:{ projects:SelectProps[], onChange:Function, name:string, value:string }) => {
  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="relative shrink flex flex-col gap-2 w-[430px] h-[90px]">

      <label htmlFor={name} className="text-md text-grey font-ev">
        Проект
      </label>
      <div className="relative cursor-pointer">
        <Image className="animate-flyArrow absolute right-6 top-5 z-10" src={arrow} width={15} height={15} alt="" />
        <select
          className="border-solid cursor-pointer  border-black-100 relative  rounded-base w-[430px] h-[55px] border text-lg font-ev appearance-none px-5"
          id="projects"
          name={name}
          value={value}
          onChange={handleChange}
        >

          <option value="Все">
            Все
          </option>
          {projects.map((project) => (
            <option value={project.title} key={nanoid()}>
              {project.title}
            </option>
          ))}

        </select>
      </div>
    </div>
  );
};
export default memo(Select);
