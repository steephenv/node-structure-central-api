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

describe('Test adding staff in case  ===> ', () => {
  it('Adding staff', done => {
    got('http://localhost:7000/v1/case/add-staff', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`,
      },
      json: true,
      body: {
        caseId: '5bebbd46349fb41db88471d2',
        role: 'vvv',
        status: 'cccc',
        party: 'cccvvff',
        attorney: '5bebbd46349fb41db88471d2',
        assignedBy: new Date(),
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
});
