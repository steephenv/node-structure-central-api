import * as got from 'got';

describe('Test adding hearing in case  ===> ', () => {
  it(
    'Adding hearings',
    done => {
      got('http://localhost:7000/v1/case/add-order', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          caseId: '5bfe270c31618a16d7b3e690',
          order: 'Orderrr',
          orderDiv: 'dddd',
          orderDate: new Date(),
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
