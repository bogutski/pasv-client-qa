import { url } from '../../constants';
import axios from 'axios';

export default function flashCardGroupGetAll(token) {
  return axios({
    method: 'GET',
    url: `${url.server}/flashcard/group`,
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
