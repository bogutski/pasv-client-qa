const { url } = require('../../constants');
const { user } = require('../_data/data');
const axios = require('axios');

module.exports = function userGetToken(role) {
  return axios
    .post(`${url.server}/user/login`, {
      email: user[role].email,
      password: user[role].password,
    })
    .then(response => {
      // store token to global variable
      process.env[`TOKEN_${role.toUpperCase()}`] = response.data.token;

      // also this function will return token
      return response.data.token;
    })
    .catch(() => {
      return null;
    });
};
