import { url } from '../../constants';
import { user } from '../_data/data';
import axios from 'axios';

export default function userGetAdminToken() {
  return axios
    .post(`${url.server}/user/login`, {
      email: user.admin.email,
      password: user.admin.password,
    })
    .then(response => {
      process.env.TOKEN = response.data.token;
      return response.data.token;
    })
    .catch(() => {
      return null;
    });
}
