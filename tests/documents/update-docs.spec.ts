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

describe('Test for update docs  ===> ', () => {
<<<<<<< HEAD
  it('update docs', done => {
    got('http://localhost:7000/v1/documents/update-doc', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        docId: '5bea71d75776291e9a36c1c6',
        docUrl: 'images/1544684606177-800.jpg',
      },
    })
      .then(() => done())
      .catch(err => {
        expect(err.response.statusCode).toBe(400);
        // throw err;
        done();
      });
  }, 15000);
=======
  it(
    'update docs',
    done => {
      got('http://localhost:7000/v1/documents/update-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `Bearer ${token}`,
        },
        json: true,
        body: {
          docId: '5c25f1c4238af92408119d05',
          status: 'close',
          docUrl: 'images/1544684606177-800.jpg',
        },
      })
        .then(() => done())
        .catch(err => {
          expect(err.response.statusCode).toBe(400);
          // throw err;
          done();
        });
    },
    15000,
  );
>>>>>>> master
});
