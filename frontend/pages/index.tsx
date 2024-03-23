/* eslint-disable @typescript-eslint/naming-convention */

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
import { useSearchParams } from 'next/navigation';
import Item from '../components/Item';
import {
  validParamsProps, queryParamsProps, valueParamsProps,
} from '../helper/types';

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
  const [queryParams, setQueryParams] = useState({ } as queryParamsProps);
  const [valueParams, setValueParams] = useState<valueParamsProps>({
    projects: { value: '', id: 1 }, rooms: NaN, price: { min: 0, max: 0 }, square: { min: 0, max: 0 },
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async (newParams = {}, replaceHistory = false) => {
    const params = { ...queryParams, ...newParams };
    setQueryParams(params);

    // Сохранить параметры в адрес страницы
    const urlSearch = new URLSearchParams(exclude({ ...params }, { })).toString();
    const url = window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = exclude({ ...params }, { });

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
    const { per_page, total } = meta;
    setCount(per_page);
    setTotalElem(total);
    if (!total) {
      setDate([...date, ...data]);
    }
    setDate(data);
    setLoading(false);
  };

  const initParams = async (newParams = {}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const validParams = {} as validParamsProps;
    if (urlParams.has('f[projects][]') && urlParams.get('f[projects][]') !== '') validParams['f[projects][]'] = Number(urlParams.get('f[projects][]'));
    if (urlParams.has('f[price][min]')) validParams['f[price][min]'] = Number(urlParams.get('f[square][min]'));
    if (urlParams.has('f[price][max]')) validParams['f[price][max]'] = Number(urlParams.get('f[square][max]'));
    if (urlParams.has('f[rooms][]')) validParams['f[rooms][]'] = Number(urlParams.get('f[rooms][]'));
    if (urlParams.has('f[square][min]')) validParams['f[price][min]'] = Number(urlParams.get('f[price][min]'));
    if (urlParams.has('f[square][max]')) validParams['f[price][max]'] = Number(urlParams.get('f[price][max]'));
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    setQueryParams(validParams);
    if (validParams['f[projects][]']) {
      setValueParams(
        (prevState) => ({
          ...prevState,
          rooms: validParams['f[rooms][]'],
          projects: {
            value: localStorage.getItem('title'),
            id: validParams['f[projects][]'],
          },

        }),
      );
    }

    await fetchData({ ...queryParams, ...validParams, ...newParams }, true);
  };
  // const handleChangeCheck = (target : HTMLSelectElement | HTMLInputElement) => {
  //   setPage(1111);
  //   // setValueParams((prevState) => ({
  //   //   ...prevState,
  //   //   [target.name]: target.value,
  //   // }));
  // };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    // fetchData({ 'f[projects][]': 5 });
    // setPage((prev) => prev + 1);
    // setFetching((prev) => !prev);
  };

  const handleChange = (target : HTMLSelectElement | HTMLInputElement) => {
    if (target.name === 'projects') {
      if (target.value === 'все') {
        delete queryParams['f[projects][]'];
        setValueParams((prevState) => ({
          ...prevState,
          projects: {
            value: target.value,
            id: '',
          },
        }));
        localStorage.setItem('title', 'Все');
        fetchData();
      } else {
        setValueParams((prevState) => ({
          ...prevState,
          projects: {
            value: target.value,
            id: (dataFilter.projects.find((elem) => elem.title === target.value)).id,
          },
        }));
        setQueryParams((prevState) => ({
          ...prevState,
          'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id,
        }));
        localStorage.setItem('title', target.value);
        fetchData({ 'f[projects][]': (dataFilter.projects.find((elem) => elem.title === target.value)).id });
      }
    } else if (target.name === 'rooms') {
      setValueParams((prevState) => ({
        ...prevState,
        [target.name]: Number(target.value),
      }));
      setQueryParams((prevState) => ({
        ...prevState,
        'f[rooms][]': Number(target.value),
      }));
      fetchData({ 'f[rooms][]': Number(target.value) });
    } else if (target.name === 'min') {
      setValueParams((prevState) => ({
        ...prevState,
        price: { min: Number(target.value), max: Number(target.id) },
      }));
      setQueryParams((prevState) => ({
        ...prevState,
        'f[price][min]': Number(target.value),
        'f[price][max]': Number(target.id),
      }));
      fetchData({ 'f[price][min]': Number(target.value), 'f[price][max]': Number(target.id) });
    }
  };
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

  useEffect(() => {
    initParams();
  }, []);

  return (

    <div className="container min-h-[1920px]  px-1 pt-8 pb-8 mx-auto">
      <h4 className="">
        ПЛАНИРОВКИ
      </h4>
      <Layout total={totalElem}>
        <Select projects={dataFilter.projects} onChange={handleChange} name="projects" value={valueParams.projects.value} />
        <Checkbox rooms={dataFilter.rooms} onChange={handleChange} name="rooms" value={valueParams.rooms} />
        <DoubleRangeInput
          param="price"
          unit={false}
          label="Стоимость"
          price={dataFilter.price}
          onChange={handleChange}
        />
        {/* <DoubleRangeInput
          param="square"
          unit
          label="Задайте площадь, м²"
          price={dataFilter.square}
          onChange={handleChange}
        />   */}
        <DoubleRangeInput
          param="mm"
          unit={false}
          label="s"
          price={dataFilter.price}
          onChange={(target : HTMLSelectElement | HTMLInputElement) => console.log(target, valueParams)}
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
