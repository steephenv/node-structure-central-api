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

describe('Test for Delete docs  ===> ', () => {
  it(
    'Delete docs',
    done => {
      got(
        'http://localhost:7000/v1/documents/del-doc?docId=5c1242428688b4d64997f324',
        {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Authorization: `Bearer ${token}`,
          },
          json: true,
        },
      )
        .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(400);
          // throw err;
          done();
        });
    },
    15000,
  );
});
