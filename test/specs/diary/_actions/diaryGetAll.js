import { url } from '../../constants';
import axios from 'axios';

export default function diaryGetAll(token) {
  return axios({
    method: 'GET',
    url: `${url.server}/diary`,
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
}
