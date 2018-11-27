import * as got from 'got';

describe('Test adding staff in case  ===> ', () => {
  it(
    'Adding staff',
    done => {
      got('http://localhost:7000/v1/case/add-staff', {
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
          attorney: '5bebbd46349fb41db88471d2',
          assignedBy: new Date(),
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
