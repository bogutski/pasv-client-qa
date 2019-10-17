import { url } from '../../constants';
import axios from 'axios';

export default function groupsGetAll(token) {
  return axios({
    method: 'GET',
    url: `${url.server}/group`,
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
