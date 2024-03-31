/* eslint-disable import/no-cycle */
import { AppDispatch, RootState } from '@/store/store';
/* eslint-disable @typescript-eslint/naming-convention */
import exclude from '@/helper';
import { validParamsProps } from '@/helper/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type queryParamsProps = {
  'f[projects][]':number | '',
  'f[rooms][]':number | '',
  'f[price][min]':number | '',
  'f[price][max]':number | '',
  'f[square][min]':number | '',
  'f[square][max]':number | '',
  'page':number,
};

const FlatsSlice = createSlice({
  name: 'flats',
  initialState: {
    data: [] as validParamsProps[],
    dataFilter: {
      projects: [],
      rooms: [
        {
          number: 0,
          is_active: true,
          disabled: false,
        },
        {
          number: 1,
          is_active: true,
          disabled: false,
        }, {
          number: 2,
          is_active: true,
          disabled: false,
        }, {
          number: 3,
          is_active: true,
          disabled: false,
        }, {
          number: 4,
          is_active: true,
          disabled: false,
        }],
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
    },
    valueParams: {
      'f[projects][]': '', 'f[rooms][]': NaN, 'f[price][min]': 0, 'f[price][max]': 0, 'f[square][min]': 0, 'f[square][max]': 0,
    },
    queryParams: {
      page: 1,
    } as queryParamsProps,
    loading: false,
    move: true,
    count: 0,
    totalElem: 0,
    error: '',
  },
  reducers: {
    queryRequested: (state, action:PayloadAction<any>) => {
      state.queryParams = { ...state.queryParams, ...action.payload };
      state.loading = true;
      state.valueParams = { ...state.valueParams, ...action.payload };
    },
    loadFlatsRequested: (
      state,
      action:PayloadAction<any>,
    ) => {
      const {
        data, per_page, total, projects, rooms, price, square,
      } = action.payload;
      if (state.queryParams.page > 1) {
        return {
          ...state,
          data: [...state.data, ...data],
          count: per_page,
          totalElem: total,
          dataFilter: {
            projects, rooms, price, square,
          },
          loading: false,
        };
      }
      if (state.queryParams.page === 1) {
        return {
          ...state,
          data,
          count: per_page,
          totalElem: total,
          dataFilter: {
            projects, rooms, price, square,
          },
          loading: false,
        };
      }
      return state;
    },
    loadFlatsRequestFailed: (state, action:PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    changeMoveRequested: (state, action:PayloadAction<boolean>) => ({
      ...state,
      move: !action.payload,
    }),
    changePageRequested: (state, action:PayloadAction<number>) => ({
      ...state,
      queryParams: { ...state.queryParams, page: action.payload + 1 },
    }),

  },
});

export const {
  queryRequested, loadFlatsRequested,
  loadFlatsRequestFailed,
  changePageRequested, changeMoveRequested,
} = FlatsSlice.actions;
export default FlatsSlice.reducer;

export const changeMove = (status:boolean) => (
  dispatch:AppDispatch,
) => dispatch(changeMoveRequested(status));

export const setParams = (
  newParams = {},
  replaceHistory = false,
) => async (dispatch:AppDispatch, getState:RootState) => {
  const params = { ...getState().flats.queryParams, ...newParams };
  dispatch(queryRequested(params));
  try {
    const urlSearch = new URLSearchParams(exclude(params, {
      'f[projects][]': '',
      'f[rooms][]': '',
      'f[price][min]': '',
      'f[price][max]': '',
      'f[square][min]': '',
      'f[square][max]': '',
    })).toString();
    const url = window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = exclude({
      'f[projects][]': getState().flats.queryParams['f[projects][]'],
      'f[rooms][]': getState().flats.queryParams['f[rooms][]'],
      'f[price][min]': getState().flats.queryParams['f[price][min]'],
      'f[price][max]': getState().flats.queryParams['f[price][max]'],
      'f[square][min]': getState().flats.queryParams['f[square][min]'],
      'f[square][max]': getState().flats.queryParams['f[square][max]'],
      page: getState().flats.queryParams.page,
    }, {
      'f[projects][]': '',
      'f[rooms][]': '',
      'f[price][min]': '',
      'f[price][max]': '',
      'f[square][min]': '',
      'f[square][max]': '',
      page: '',
    });
    const resFlats = await fetch(`http://localhost:8083/api/v1/flats?${new URLSearchParams(apiParams)}`);
    const resFilters = await fetch(`http://localhost:8083/api/v1/filters?${new URLSearchParams(apiParams)}`);
    const { data, meta } = await resFlats.json();
    const { data: dataFilters } = await resFilters.json();
    const {
      projects, rooms, price, square,
    } = dataFilters;
    const { per_page, total } = meta;
    dispatch(loadFlatsRequested({
      data, per_page, total, projects, rooms, price, square,
    }));
  } catch (e:any) {
    dispatch(loadFlatsRequestFailed(e.data.message));
  }
};

export const initParams = (
  newParams = {},
) => async (dispatch:AppDispatch, getState:RootState) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const validParams = {} as validParamsProps;
    if (urlParams.has('f[projects][]')) validParams['f[projects][]'] = Number(urlParams.get('f[projects][]'));
    if (urlParams.has('f[price][min]')) validParams['f[price][min]'] = Number(urlParams.get('f[price][min]'));
    if (urlParams.has('f[price][max]')) validParams['f[price][max]'] = Number(urlParams.get('f[price][max]'));
    if (urlParams.has('f[rooms][]')) validParams['f[rooms][]'] = Number(urlParams.get('f[rooms][]'));
    if (urlParams.has('f[square][min]')) validParams['f[square][min]'] = Number(urlParams.get('f[square][min]'));
    if (urlParams.has('f[square][max]')) validParams['f[square][max]'] = Number(urlParams.get('f[square][max]'));
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    dispatch(setParams({ ...getState().flats.queryParams, ...validParams, ...newParams }, true));
  } catch (e:any) {
    dispatch(loadFlatsRequestFailed(e.data.message));
  }
};

export const resetParams = () => async (dispatch:AppDispatch) => {
  try {
    const params = {
      'f[projects][]': '',
      'f[rooms][]': '',
      'f[price][min]': '',
      'f[price][max]': '',
      'f[square][min]': '',
      'f[square][max]': '',
      page: 1,
    };
    // Установка параметров и загрузка данных
    await dispatch(setParams(params));
  } catch (e:any) {
    dispatch(loadFlatsRequestFailed(e.data.message));
  }
};

export const changePage = (number:number) => async (dispatch:AppDispatch, getState:RootState) => {
  dispatch(changePageRequested(number));
  try {
    // Установка параметров и загрузка данных
    await dispatch(setParams(getState().flats.queryParams));
  } catch (e:any) {
    dispatch(loadFlatsRequestFailed(e.data.message));
  }
};
