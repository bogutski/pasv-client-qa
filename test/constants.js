const baseUrl = 'https://stage.pasv.us';

const url = {
  baseUrl,
  loginUrl: `${baseUrl}/user/login`,
  registerUrl: `${baseUrl}/user/register`,
  serverUrl: 'https://server-stage.pasv.us'
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
    email: 'student_viktor@test.com',
    password: '11111',
    // id: '5d687e4983d5d600380e6b51',
    name: 'Test Student',
    phone: '+12312312334',
    about: 'About Test Student About Test Student About Test Student About Test Student',
    goals: 'About Test Student About Test Student About Test Student About Test Student'
  }
};


module.exports = {
  url,
  user
};
