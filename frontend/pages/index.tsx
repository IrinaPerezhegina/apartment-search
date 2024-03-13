import { NextPage } from 'next';
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import Spinner from '@/components/Spinner';
import Select from '@/components/ui/Select';
import Item from '../components/Item';

const HomePage: NextPage = () => {
  const [dataFilter, setDataFilter] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>();
  const [totalElem, setTotalElem] = useState<number>();
  const [date, setDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    const resFlats = await fetch(`http://localhost:8083/api/v1/flats?page=${page}`);
    const resFilters = await fetch('http://localhost:8083/api/v1/filters');
    const { data, meta } = await resFlats.json();
    const { data: dataFilters } = await resFilters.json();
    const {
      projects, rooms, price, square,
    } = dataFilters;
    setDataFilter({
      projects, price, square, rooms,
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { per_page, total } = meta;
    setCount(per_page);
    setTotalElem(total);
    setDate([...date, ...data]);
    setLoading(false);
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setPage((prev) => prev + 1);
    setFetching((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, [fetching]);
  return (

    <div className="container min-h-[1920px]  px-1 pt-10 pb-8 mx-auto">
      <h4 className="">
        ПЛАНИРОВКИ
      </h4>
      <Select />
      <div className="basis-1/3 h-screen gap-y-5 justify-center items-center flex gap-5 flex-wrap box-border">
        {date.map((el) => (
          <Item item={el} key={el.id} />
        ))}
        <div className="cursor-pointer mb-5 flex w-[580px] gap-4 h-[58px]  text-white text-xl bg-blue  rounded items-center justify-center">
          <Spinner status={loading}>
            <button onClick={handleClick} disabled={date.length >= totalElem} type="button" className="w-[580px] gap-4 h-[58px] items-center align-middle">
              Показать еще
              {' '}
              {count}
              {' '}
              из
              {' '}

              {(totalElem) - (date.length)}
            </button>
          </Spinner>

        </div>
      </div>

    </div>

  );
};

export default HomePage;
