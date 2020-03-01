export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 15;

export const DEFAULT_FILTERS = {
  compconds: {},
  fields: '',
  logics: {},
  orders: [],
  paging: {
    page: 1,
    perPage: DEFAULT_PER_PAGE,
    pageTotal: 0,
    recordTotal: 0,
    next: null,
    prev: null,
  },
  searches: {},
};

export const DEFAULT_RECORDS = {
	isFetching: false,
  filters: DEFAULT_FILTERS,
  records: [],
};