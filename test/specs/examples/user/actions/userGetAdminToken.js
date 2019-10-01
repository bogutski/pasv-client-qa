import { url } from '../../constants';
import { user } from '../constants';
import axios from 'axios/index';

export function userGetAdminToken() {
  return axios
    .post(`${url.serverUrl}/user/login`, {
      email: user.admin.email,
      password: user.admin.password,
    })
    .then(response => {
      return response.data.token;
    })
    .catch(() => {
      return null;
    });
}
