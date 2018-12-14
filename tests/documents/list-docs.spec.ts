import * as got from 'got';

let token = '';

beforeAll(done => {
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
    .then(res => {
      token = res.body.accessToken;
      return done();
    })
    .catch(err => {
      throw err;
    });
});

describe('Test for list docs  ===> ', () => {
  it(
    'List docs',
    done => {
      got(
        'http://localhost:7000/v1/documents/list-folders?caseId=5bee9acd04caea06b0b38e1a',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
});
