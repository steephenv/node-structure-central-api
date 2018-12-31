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

describe('Test for Copy docs  ===> ', () => {
  it('Copy docs', done => {
    got('http://localhost:7000/v1/documents/copy-doc', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        destinationUrl: '/test-images/new11',
        docType: '5c10d160a258192a68f957ab',
        docId: '5c1223039e6e843d12d836a3',
      },
    })
      .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(400);
        // throw err;
        done();
      });
  }, 15000);
});
