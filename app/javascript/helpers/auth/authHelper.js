import { SIGN_IN_PATH, SIGN_OUT_PATH } from 'app/constants/paths'

export function getCredentials() {
  return {
    'access-token': localStorage.getItem('cibertron-access-token'),
    'uid': localStorage.getItem('cibertron-uid'),
  }
}

export function setCredentials(credentials) {
  if(credentials) {
    localStorage.setItem('cibertron-access-token', credentials['access-token'])
    localStorage.setItem('cibertron-uid', credentials['uid'])
  } else {
    return false
  }
}

export function deleteCredentials() {
  localStorage.removeItem('cibertron-access-token')
  localStorage.removeItem('cibertron-uid')

  return !isAuthenticated()
}

export function isAuthenticated() {
  const credentials = getCredentials()
  return credentials['access-token'] && credentials['uid']
}

export function requireAuth() {
  if(!isAuthenticated()) {
    window.location.href = `${SIGN_IN_PATH}?redirect_url=${window.location.href}`
  }
}

export function handleAuthFailure() {
  window.location.href = SIGN_OUT_PATH
}