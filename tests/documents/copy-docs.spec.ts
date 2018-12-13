import * as got from 'got';

describe('Test for Copy docs  ===> ', () => {
  it(
    'Copy docs',
    done => {
      got('http://localhost:7000/v1/documents/copy-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
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
    },
    15000,
  );
});
