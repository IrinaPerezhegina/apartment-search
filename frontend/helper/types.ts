/* eslint-disable @typescript-eslint/naming-convention */
export type validParamsProps = {
  'f[projects][]': number,
  'f[square][min]': number,
  'f[square][max]': number,
  'f[rooms][]': number,
  'f[price][min]': number,
  'f[price][max]': number,
  page: number,

};
export type queryParamsProps = {
  'f[projects][]':number | '',
  'f[square][min]':number,
  'f[square][max]':number,
  'f[rooms][]':number,
  'f[price][min]':number,
  'f[price][max]':number,
  page:number,
};

export type valueParamsProps = {
  projects: {
    value:string,
    id:number | ''
  },
  rooms: number,
  price: {
    min: number,
    max: number,
  },
  square: {
    min: number,
    max: number,
  },
};

export type filterParamsProps = {
  projects: {
    is_active:boolean
    disabled: boolean
    title:string,
    id:number | ''
  }[],
  rooms: {
    is_active:boolean
    disabled: boolean
    number:string,
  }[],
  price: {
    min: number,
    max: number,
    min_range: number,
    max_range: number,
  },
  square: {
    min: number,
    max: number,
    min_range: number,
    max_range: number,
  },
};
