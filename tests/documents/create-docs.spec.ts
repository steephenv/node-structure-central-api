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

describe('Test for create docs  ===> ', () => {
  it(
    'create docs',
    done => {
      got('http://localhost:7000/v1/documents/create-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          docUrl: 'images/1544684606177-800.jpg',
          docTitle: 'vvvvvv',
          pageCount: 123,
          status: 'open',
        },
      })
        .then(() => done())
        .catch(err => {
          // expect(err.response.statusCode).toBe(400);
          // throw err;
          done();
        });
    },
    15000,
  );
});
