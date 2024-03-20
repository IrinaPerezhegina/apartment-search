import exclude from '@/helper';

export default const setParams = async (oldParams = {}, newParams = {}, replaceHistory = false) => {
  const params = { ...oldParams, ...newParams };
  setParams(params);

  // Сохранить параметры в адрес страницы
  const urlSearch = new URLSearchParams(exclude(params, oldParams)).toString();
  const url = window.location.pathname + (urlSearch ? `?${urlSearch}` : '') + window.location.hash;
  if (replaceHistory) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }

  const apiParams = exclude({
    limit: params.limit,
    skip: (params.page - 1) * params.limit,
    fields: 'items(*),count',
    sort: params.sort,
    'search[query]': params.query,
    'search[category]': params.category
  }, {
    skip: 0,
    'search[query]': '',
    'search[category]': ''
  });

   
};

  // const initParams = async (newParams = {}) => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const validParams = {} as validParamsProps;
  //   if (urlParams.has('f[projects][]')) validParams['f[projects][]'] = Number(urlParams.get('f[projects][]'));
  //   if (urlParams.has('f[square][min]')) validParams['f[square][min]'] = Number(urlParams.get('f[square][min]'));
  //   if (urlParams.has('f[square][max]')) validParams['f[square][max]'] = Number(urlParams.get('f[square][max]'));
  //   if (urlParams.has('f[rooms][]')) validParams['f[rooms][]'] = Number(urlParams.get('f[rooms][]'));
  //   if (urlParams.has('f[square][min]')) validParams['f[price][min]'] = Number(urlParams.get('f[price][min]'));
  //   if (urlParams.has('f[square][max]')) validParams['f[price][max]'] = Number(urlParams.get('f[price][max]'));
  //   if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
  //   await this.setParams({ ...this.initState().params, ...validParams, ...newParams }, true);
  // };