import authRequest from 'libs/requests/authRequest'
import * as actionTypes from '../constants/actionTypes'
import {
  AUTHSERVICE_BASE_URL, DEPARTMENTS_API_PATH, ROLES_API_PATH,
  ADMINROLES_API_PATH
} from '../constants/paths'
import { getFilterParams } from 'helpers/applicationHelper'
