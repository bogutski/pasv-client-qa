const { expect } = require('chai');
const registerAction = require('./../../../actions/registerAction');
const { url, user } = require('./../../../constants');
const axios = require('axios');

describe('User --- Register and Login --- Interg', () => {
  before(() => {
    // Delete user

    console.log('------------------------------');

    axios.post(`${url.serverUrl}/user/login`, {
      email: user.admin.email,
      password: user.admin.password
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log('------------------------------');
  });


  it('should ', () => {
    expect(2).eq(2);
  });
  // it('should register new user', () => {
  //   registerAction(browser);
  //   browser.pause(20000)
  // });


});
