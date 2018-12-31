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

describe('Test adding participant in case  ===> ', () => {
  it('Adding participant', done => {
    got('http://localhost:7000/v1/case/add-participant', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        caseId: '5bebbd46349fb41db88471d2',
        role: '5bebbd46349fb41db88471d2',
        status: 'cccc',
        party: 'cccvvff',
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
});
