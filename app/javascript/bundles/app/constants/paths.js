export const SIGN_IN_PATH = '/auth/sign_in'
export const SIGN_UP_PATH = '/auth/sign_up'
export const SIGN_OUT_PATH = '/auth/sign_out'

export const AUTHSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://authservice.edumall.io' : 'http://localhost:9000'
export const USERSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://userservice.edumall.io' : 'http://localhost:9001'
export const CRONUS_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://cronus.edumall.io' : 'http://localhost:9002'
export const SOL_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://sol.edumall.io' : 'http://localhost:9003'