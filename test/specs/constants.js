const baseUrl = 'https://stage.pasv.us';

const url = {
  baseUrl,

  login: `${baseUrl}/user/login`,
  register: `${baseUrl}/user/register`,
  forgotPassword: `${baseUrl}/user/password/reset/request`,
  checkEmail: `${baseUrl}/user/password/reset/mailed`,

  diaryList: `${baseUrl}/diary`,
  diaryCreateForm: `${baseUrl}/diary/create`,

  group: `${baseUrl}/group`,
  createGroup: `${baseUrl}/group/create`,

  card: `${baseUrl}/flash`,
  createFlashGroup: `${baseUrl}/flash/group/create`,

  server: 'https://server-stage.pasv.us',
};

const app = {
  name: 'Progress Monitor',
  slogan: 'eat(); sleep(); code(); repeat();',
};

module.exports = {
  url,
  app,
};
