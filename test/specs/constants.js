const baseUrl = 'https://stage.pasv.us';

const url = {
  baseUrl,

  login: `${baseUrl}/user/login`,
  register: `${baseUrl}/user/register`,
  forgotPassword: `${baseUrl}/user/password/reset/request`,

  diaryList: `${baseUrl}/diary`,
  diaryCreateForm: `${baseUrl}/diary/create`,

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
