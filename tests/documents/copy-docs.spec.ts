import * as got from 'got';

describe('Test for Move docs  ===> ', () => {
  it(
    'Move docs',
    done => {
      got('http://localhost:7000/v1/documents/copy-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          destinationUrl: '/test-images/new',
          docType: '5c10d160a258192a68f958ab',
          docId: '5c10d160a258192a68f958ab',
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
