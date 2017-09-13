import { SIGN_IN_PATH } from 'app/constants/paths'

export function getCredentials() {
  return {
    'access-token': localStorage.getItem('access-token'),
    'uid': localStorage.getItem('uid'),
    'client': localStorage.getItem('client'),
  }
}

export function setCredentials(credentials) {
  if(credentials) {
    localStorage.setItem('access-token', credentials['access-token'])
    localStorage.setItem('uid', credentials['uid'])
    localStorage.setItem('client', credentials['client'])
  } else {
    return false
  }
}

export function isAuthenticated() {
  const credentials = getCredentials()
  return credentials['access-token'] && credentials['uid'] && credentials['client']
}

export function requireAuth() {
  if(!isAuthenticated()) {
    window.location.href = `${SIGN_IN_PATH}?redirect_url=${window.location.href}`
  }
}