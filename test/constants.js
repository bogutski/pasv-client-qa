const baseUrl = 'https://stage.pasv.us';

const url = {
  baseUrl,
  loginUrl: `${baseUrl}/user/login`,
  registerUrl: `${baseUrl}/user/register`,
};

const user = {
  admin: {
    email: 'admin@test.com',
    password: '11111',
    id: '5d687e4983d5d600380e6b51',
    name: 'Ruslan Admin',
    phone: '+12312312334'
  },
  student: {
    login: '',
    password: ''
  }
};


module.exports = {
  url,
  user
};
