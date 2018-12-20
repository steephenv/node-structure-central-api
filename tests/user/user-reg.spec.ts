import * as got from 'got';

describe('Test for sign up functionality  ===> ', () => {
  it(
    'Registration Functionality',
    done => {
      got('http://localhost:7000/v1/user/register', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          email: 'lappi@yopmail.com',
          password: '123456',
          role: 'user',
        },
      })
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
});
