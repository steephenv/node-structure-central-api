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

describe('Test adding fetching case  ===> ', () => {
  it('Fetching case', done => {
    got(
      'http://localhost:7000/v1/case/fetch-case?caseId=5bfe270c31618a16d7b3e690',
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
  }, 15000);
});
