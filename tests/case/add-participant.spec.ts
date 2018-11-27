import * as got from 'got';

describe('Test adding participant in case  ===> ', () => {
  it(
    'Adding participant',
    done => {
      got('http://localhost:7000/v1/case/add-participant', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          caseId: '5bebbd46349fb41db88471d2',
          role: 'vvv',
          status: 'cccc',
          party: 'cccvvff',
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
