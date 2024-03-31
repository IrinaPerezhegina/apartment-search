/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import { NextPage } from 'next';
import React, {
  useCallback, useEffect,
} from 'react';
import Spinner from '@/components/Spinner';
import Select from '@/components/ui/Select';
import Layout from '@/components/Layout';
import Checkbox from '@/components/ui/Checkbox';
import DoubleRangeInput from '@/components/ui/DoubleScrollBar';
// import exclude from '@/helper';
import NoTFound from '@/components/NotFound';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  changeMove, changePage, initParams, resetParams, setParams,
} from '../slices/FlatsSlice';

import Item from '../components/Item';
import { ItemProps } from '../helper/types';

const HomePage: NextPage = () => {
  const dispatch = useAppDispatch();
  const flats = useAppSelector((state) => (state.flats));

  const callbacks = {
    // Выбор проекта
    onSelect: useCallback(
      (target : HTMLSelectElement) => {
        if (target.value === 'все') {
          dispatch(setParams({ 'f[projects][]': '', page: 1 }));
        } else dispatch(setParams({ 'f[projects][]': (flats.dataFilter.projects.find((elem :{ title:string, id:number }) => elem.title === target.value)).id, page: 1 }));
      },
      [flats, dispatch],
    ),
    // Выбор количесвта комнат
    onCheckbox: useCallback(
      (target : HTMLInputElement) => dispatch(setParams({ 'f[rooms][]': Number(target.value), page: 1 })),
      [dispatch],
    ),
    // Выбор цены
    handleChangePrice: useCallback(
      (target : HTMLInputElement) => {
        if (target.title === 'min') {
          dispatch(setParams({ 'f[price][min]': Number(target.value), 'f[price][max]': Number(target.id), page: 1 }));
        } else dispatch(setParams({ 'f[price][max]': Number(target.value), 'f[price][min]': Number(target.id), page: 1 }));
      },
      [dispatch],
    ),
    // Выбор квадратов
    handleChangeSquare: useCallback(
      (target : HTMLInputElement) => {
        if (target.title === 'min') {
          dispatch(setParams({ 'f[square][min]': Number(target.value), 'f[square][max]': Number(target.id), page: 1 }));
        } else dispatch(setParams({ 'f[square][max]': Number(target.value), 'f[square][min]': Number(target.id), page: 1 }));
      },
      [dispatch],
    ),
    // Обнуление параметров query
    onReset: useCallback(
      () => dispatch(resetParams()),
      [dispatch],
    ),
    // Изменение статуса
    onChangeMove: useCallback(
      () => dispatch(changeMove(flats.move)),
      [dispatch, flats],
    ),
    // Изменение статуса
    onTurnPage: useCallback(
      () => dispatch(changePage(flats.queryParams.page)),
      [dispatch, flats.queryParams.page],
    ),
  };
  function getProjectTitle(array:[{ title:string, id:number, 'is_active':boolean, 'disabled':boolean }], id:number) {
    const project = (array.find((
      elem :{ title:string, id:number, 'is_active':boolean, 'disabled':boolean },
    ) => elem.id === id));
    return project ? project.title : 'Все';
  }

  useEffect(() => {
    dispatch(initParams());
  }, [dispatch]);

  return (
    <div className="container w-auto h-auto max-sm:pt-4 max-sm:pb-20 max-sm:px-0 pt-8 pb-8 mx-auto px-1">
      <Layout
        status={flats.loading}
        closeFilterMobile={callbacks.onChangeMove}
        total={flats.totalElem}
        resetParams={callbacks.onReset}
        move={flats.move}
      >
        <Select
          projects={flats.dataFilter.projects}
          onChange={callbacks.onSelect}
          name="projects"
          value={getProjectTitle(flats.dataFilter.projects, flats.valueParams['f[projects][]'])}
        />
        <Checkbox
          rooms={flats.dataFilter.rooms}
          onChange={callbacks.onCheckbox}
          name="rooms"
          value={flats.valueParams['f[rooms][]']}
        />
        <DoubleRangeInput
          name="price"
          unit={false}
          initialValue={{
            min: flats.valueParams['f[price][min]'],
            max: flats.valueParams['f[price][max]'],
          }}
          label="Стоимость"
          inputData={flats.dataFilter.price}
          onChange={callbacks.handleChangePrice}
        />
        <DoubleRangeInput
          unit
          name="square"
          label="Задайте площадь, м²"
          initialValue={{
            min: flats.valueParams['f[square][min]'],
            max: flats.valueParams['f[square][max]'],
          }}
          inputData={flats.dataFilter.square}
          onChange={callbacks.handleChangeSquare}
        />
      </Layout>
      <div className={flats.move ? 'max-sm:hidden' : ''}>
        <div className="pt-12 max-sm:pt-2 basis-1/3 h-screen max-sm:gap-2 gap-y-5 justify-center items-center flex gap-5 flex-wrap box-border">
          { (!flats.loading && flats.data.length === 0) ? <NoTFound />
            : (flats.data.map((el:ItemProps) => (
              <Item item={el} key={el.id} />)))}
          <div className="pt-6 w-full flex justify-center">
            <div className={!flats.loading && (flats.totalElem) - (flats.data.length) === 0 ? 'hidden' : 'max-sm:w-full w-[580px]'}>
              <div className=" cursor-pointer mb-6 flex w-auto gap-4 h-[58px] max-sm:h-[42px]  text-white max-sm:text-xs text-xl bg-blue max-sm:rounded-base items-center justify-center rounded-[5px]">
                <Spinner status={flats.loading}>
                  <button
                    onClick={callbacks.onTurnPage}
                    disabled={flats.data.length >= flats.totalElem}
                    type="button"
                    className="w-full gap-4 h-full items-center align-middle "
                  >
                    Показать еще
                    {' '}
                    {flats.count}
                    {' '}
                    из
                    {' '}
                    {(flats.totalElem) - (flats.data.length)}
                  </button>
                </Spinner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
