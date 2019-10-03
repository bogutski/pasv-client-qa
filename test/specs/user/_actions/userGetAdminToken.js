const { url } = require('../../constants');
const { user } = require('../_data/data');
const axios = require('axios');

module.exports = function userGetAdminToken() {
  return axios
    .post(`${url.server}/user/login`, {
      email: user.admin.email,
      password: user.admin.password,
    })
    .then(response => {
      // store token to global variable
      process.env.TOKEN_ADMIN = response.data.token;

      // also this function will return token
      return response.data.token;
    })
    .catch(() => {
      return null;
    });
};
