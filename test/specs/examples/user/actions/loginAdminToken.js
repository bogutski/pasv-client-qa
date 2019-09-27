import { url } from '../../constants';
import { user } from '../constants';
import axios from 'axios/index';

export function userLoginAdmin() {
  return axios
    .post(`${url.serverUrl}/user/login`, {
      email: user.admin.email,
      password: user.admin.password,
    })
    .then(response => {
      console.log(response.data.token);

      const adminToken = response.data.token;
      console.log(adminToken);
    });
}
