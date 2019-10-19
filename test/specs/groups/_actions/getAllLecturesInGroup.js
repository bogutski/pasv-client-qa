import { url } from '../../constants';
import axios from 'axios';

export default function getAllLectures(token, groupId) {
  return axios({
    url: `${url.server}/group/${groupId}`,
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then(response => {
      return response.data.lectures;
    })
    .catch(err => {
      console.log(err);
    });
}
