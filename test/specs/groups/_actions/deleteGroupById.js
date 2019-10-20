import { url } from '../../constants';
import axios from 'axios';

export default function deleteGroupById(token, groupId) {
  return axios({
    url: `${url.server}/group/${groupId}`,
    method: 'DELETE',
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
