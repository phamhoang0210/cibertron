export const SIGN_IN_PATH = '/auth/sign_in'
export const SIGN_UP_PATH = '/auth/sign_up'
export const SIGN_OUT_PATH = '/auth/sign_out'

export const AUTHSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://authservice.edumall.io' : 'http://localhost:9000'
export const USERSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://userservice.edumall.io' : 'http://localhost:9001'
export const CRONUS_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://cronus.edumall.io' : 'http://localhost:9002'
export const SOL_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://sol.edumall.io' : 'http://localhost:9003'
export const NAUH_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://nauh.edumall.io' : 'http://localhost:9004'
export const EROS_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://eros.edumall.vn' : 'https://eros.edumall.vn'
export const GAMBIT_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://psmo.edumall.vn' : 'https://psmo.edumall.vn'
export const HERA_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://hera.edumall.io' : 'http://localhost:9007'
export const AMUN_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://amun.edumall.io' : 'http://localhost:9008'
export const A3_STORAGE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://a3-storage.edumall.io' : 'http://localhost:9009'