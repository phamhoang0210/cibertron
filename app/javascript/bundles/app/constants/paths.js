export const SIGN_IN_PATH = '/auth/sign_in'
export const SIGN_UP_PATH = '/auth/sign_up'

export const AUTHSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://authservice.edumall.io' : 'http://localhost:9000'
export const CRONUS_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://cronus.edumall.io' : 'http://localhost:8000'