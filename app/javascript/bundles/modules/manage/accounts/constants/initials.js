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

export const DEFAULT_RECORD = {
  isFetching: false,
};

export const ACCOUNT = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

//with table
export const LX_WIDTH = 310;
export const MID_WIDTH = 260;
export const SMALL_WIDTH = 100;
export const LARGE_WIDTH = 180;
export const MEDIUM_WIDTH = 120;
export const ID_WIDTH = '5%';
export const GID_WIDTH = '12%';
export const TIME_WIDTH = '12%';
export const ACTION_WIDTH_USER = '18%';
export const ACTION_WIDTH_ROLE = '11%';
export const ACTION_WIDTH_ASSIGNMENT = '7%';
export const ACTION_WIDTH = '12%';

// datetime
export const LONG_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const SHORT_DATETIME_FORMAT = 'DD/MM/YY, HH:mm';
export const REVERSE_SHORT_DATETIME_FORMAT = 'HH:mm DD/MM/YY';
export const MYSQL_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const MYSQL_DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';
// form
export const DEFAULT_FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const DEFAULT_BUTTON_ITEM_LAYOUT = {
  wrapperCol: { span: 18, offset: 6 },
};

export const DEFAULT_FORM_TAIL_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8, offset: 6 },
};

export const FILTER_FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const DEFAULT_FORM_ITEM_LAYOUT_10 = {
  labelCol: { span: 10 },
  wrapperCol: { span: 18 },
};

// table
export const FILTER_ORDER_MAPPINGS = {
  'descend': 'desc',
  'ascend': 'asc',
};