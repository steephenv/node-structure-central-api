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

describe('Test adding hearing in case  ===> ', () => {
  it('Adding hearings', done => {
    got('http://localhost:7000/v1/case/add-hearing', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        caseId: '5bfe270c31618a16d7b3e690',
        attorney: '5bfe270c31618a16d7b3e690',
        result: 'cccc',
        caseHearingType: '5bfe270c31618a16d7b3e690',
        hearingDate: new Date(),
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
});
