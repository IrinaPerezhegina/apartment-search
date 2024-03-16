/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';
import Image from 'next/image';
import arrow from '../../public/arrow.png';

type SelectProps = {
  id: number
  title: string,
  is_active: boolean,
  disabled: boolean

};

const Select = ({ projects }:{ projects:SelectProps[] }) => (

  <div className="relative flex flex-col gap-2 w-[430px] h-[90px]">

    <label htmlFor="projects" className="text-md text-grey font-ev">
      Проект
    </label>
    <div className="relative cursor-pointer">
      <Image className="animate-flyArrow absolute right-6 top-5 z-10" src={arrow} width={15} height={15} alt="" />
      <select
        className="border-solid cursor-pointer  border-black-100 relative  rounded-base w-[430px] h-[55px] border text-lg font-ev appearance-none px-5"
        id="projects"
        name="projects"
        value="projects"
        defaultValue="Initial value"
      >

        <option value="Все" defaultValue="d">
          Все
        </option>
        {projects
                    && projects.map((project) => (
                      <option value={project.title} key={project.id}>
                        {project.title}
                      </option>
                    ))}

      </select>
    </div>
  </div>
);
export default memo(Select);
