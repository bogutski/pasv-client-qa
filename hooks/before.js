const userGetAdminToken = require('../test/specs/user/_actions/userGetAdminToken');

module.exports = async function before() {
  await userGetAdminToken();
};
