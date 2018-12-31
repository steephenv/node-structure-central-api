import * as got from 'got';

describe('Test for sign in functionality  ===> ', () => {
  it('Login Functionality', done => {
    got('http://localhost:7000/v1/user/login', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        username: 'bernu@yopmail.com',
        password: '123456',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
});
