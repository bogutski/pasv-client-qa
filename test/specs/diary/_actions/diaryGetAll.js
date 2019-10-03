import { url } from '../../constants';
import axios from 'axios';

export default function diaryGetAll() {
  return axios({
    method: 'GET',
    url: `${url.server}/diary`,
    headers: {
      Authorization: process.env.TOKEN_ADMIN,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
}
