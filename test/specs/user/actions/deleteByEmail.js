import { url } from './../../../constants';
import { user } from '../constants';
import axios from 'axios';

export default function userDeleteByEmail(email) {
  return axios
    .post(`${url.serverUrl}/user/login`, {
      email: user.admin.email,
      password: user.admin.password,
    })
    .then(response => {
      console.log(response.data.token);
      const token = response.data.token;

      return axios({
        url: `${url.serverUrl}/user/email/${email}`,
        method: 'delete',
        data: {},
        headers: {
          Authorization: token,
        },
      })
        .then(resp2 => {
          console.log('----------------------------------------');
          console.log(resp2.data.message);
          console.log('----------------------------------------');
        })
        .catch(err => {
          console.log('----------------------------------------');
          console.log(err);
          console.log('----------------------------------------');
        });
    })
    .catch(err => {
      console.log(err);
    });
}
