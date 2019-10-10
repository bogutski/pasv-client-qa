import { url } from '../../constants';
import axios from 'axios';

export default function userGetAll(token) {
  return axios({
    method: 'GET',
    url: `${url.server}/user`,
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      return response.data.payload;
    })
    .catch(() => {
      return null;
    });
}
