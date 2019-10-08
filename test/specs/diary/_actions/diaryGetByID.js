import { url } from '../../constants';
import axios from 'axios';

export default function diaryGetById(token, dairyId) {
  return axios({
    method: 'GET',
    url: `${url.server}/diary/${dairyId}`,
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
