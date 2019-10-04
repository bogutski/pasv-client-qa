const userGetToken = require('../test/specs/user/_actions/userGetToken');

module.exports = async function before() {
  await userGetToken('admin');
  await userGetToken('student');
};
