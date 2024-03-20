import { NextPage } from 'next';
import React, {
  MouseEvent, useEffect, useState,
} from 'react';
import Spinner from '@/components/Spinner';
import Select from '@/components/ui/Select';
import Layout from '@/components/Layout';
import Checkbox from '@/components/ui/Checkbox';
import DoubleRangeInput from '@/components/ui/DoubleScrollBar';
import exclude from '@/helper';
import { log } from 'console';
import Item from '../components/Item';

type validParamsProps = {
  'f[projects][]':number,
  'f[square][min]':number,
  'f[square][max]':number,
  'f[rooms][]':number,
  'f[price][min]':number,
  'f[price][max]':number,
  page:number,

};
type queryParamsProps = {
  'f[projects][]':number | '',
  'f[square][min]':number,
  'f[square][max]':number,
  'f[rooms][]':number,
  'f[price][min]':number,
  'f[price][max]':number,
  page:number,

};
const HomePage: NextPage = () => {
  const [dataFilter, setDataFilter] = useState({
    projects: [],
    rooms: [],
    price: {
      min_range: 0,
      max_range: 0,
      min: 0,
      max: 0,
    },
    square: {
      min_range: 0,
      max_range: 0,
      min: 0,
      max: 0,
    },
  });
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>();
  const [totalElem, setTotalElem] = useState<number>();
  const [date, setDate] = useState([]);
  const [queryParamsr, setQueryParamsr] = useState({ } as queryParamsProps);
  const [queryParams, setQueryParams] = useState({
    projects: { }, rooms: 0, price: { min: 0, max: 0 }, square: { min: 0, max: 0 },
  });

  const [loading, setLoading] = useState(false);
  // const [fetching, setFetching] = useState(false);
  const fetchData = async (newParams = {}, replaceHistory = false) => {
    const params = { ...queryParamsr, ...newParams };
    setQueryParamsr(params);

    // Сохранить параметры в адрес страницы
    const urlSearch = new URLSearchParams(exclude(params, queryParamsr)).toString();
    const url = window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = exclude({
      'f[projects][]': queryParamsr['f[projects][]'],
      page: queryParamsr.page,

    }, {
      'f[projects][]': queryParamsr['f[projects][]'],
      page: queryParamsr.page,

    });

    const resFlats = await fetch(`http://localhost:8083/api/v1/flats?${new URLSearchParams(apiParams)}`);
    const resFilters = await fetch('http://localhost:8083/api/v1/filters?');
    const { data, meta } = await resFlats.json();
    const { data: dataFilters } = await resFilters.json();
    const {
      projects, rooms, price, square,
    } = dataFilters;
    setDataFilter({
      projects, rooms, price, square,
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { per_page, total } = meta;
    setCount(per_page);
    setTotalElem(total);
    if (!total) {
      setDate([...date, ...data]);
    }
    setDate(data);
    setLoading(false);
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    // fetchData({ 'f[projects][]': 5 });
    // setPage((prev) => prev + 1);
    // setFetching((prev) => !prev);
  };
  const handleChange = (target : HTMLSelectElement | HTMLInputElement) => {
    // if (target?.title === 'price') {
    //   setQueryParams((prevState) => ({
    //     ...prevState,
    //     price: { ...prevState.price, [target.name]: target.value },
    //   }));
    // } if (target?.title === 'square') {
    //   setQueryParams((prevState) => ({
    //     ...prevState,
    //     square: { ...prevState.square, [target.name]: target.value },
    //   }));
    // }

    setQueryParams((prevState) => ({
      ...prevState,
      projects: {
        value: target.value,
        id: (dataFilter.projects.find((elem) => elem.title === target.value)).id,
      },
    }));
    setQueryParamsr((prevState) => ({
      ...prevState,
      'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id,
    }));

    // setQueryParamsr('f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id)
    fetchData({ 'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id });
    // fetchData();
    // fetchData({ 'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id });
    // fetchData({ 'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id });
    // fetchData({ page: 10, 'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (

    <div className="container min-h-[1920px]  px-1 pt-8 pb-8 mx-auto">
      <h4 className="">
        ПЛАНИРОВКИ
      </h4>
      <Layout total={totalElem}>
        <Select projects={dataFilter.projects} onChange={handleChange} name="projects" value={queryParams.projects.value} />
        {/* <Checkbox value={queryParams.rooms} rooms={dataFilter.rooms} onChange={handleChange} name="rooms" />
        <DoubleRangeInput
          param="price"
          unit={false}
          label="Стоимость"
          price={dataFilter.price}
          onChange={handleChange}
        />
        <DoubleRangeInput
          param="square"
          unit
          label="Задайте площадь, м²"
          price={dataFilter.square}
          onChange={handleChange}
        /> */}
        <DoubleRangeInput
          param="mm"
          unit={false}
          label="s"
          price={dataFilter.price}
          onChange={({ min, max }: { min: number; max: number }) => console.log(queryParamsr)}
        />

      </Layout>

      <div className="pt-12 basis-1/3 h-screen gap-y-5 justify-center items-center flex gap-5 flex-wrap box-border">
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
