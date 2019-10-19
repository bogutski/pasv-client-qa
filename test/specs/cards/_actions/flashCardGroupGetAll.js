import { url } from '../../constants';
import axios from 'axios';

export default function flashCardGroupGetAll(token) {
  return axios({
    method: 'GET',
    url: `${url.server}/flash/group`,
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
