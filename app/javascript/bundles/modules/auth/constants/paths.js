export const AUTHSERVICE_BASE_URL = process.env.NODE_ENV == 'production' ? 'https://authservice.edumall.io' : 'http://localhost:9000'

export const AUTH_URL = '/auth'
export const AUTH_SIGN_IN_URL = '/auth/sign_in'
export const AUTH_SIGN_UP_URL = '/auth/sign_up'