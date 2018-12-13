import * as got from 'got';

describe('Test for Copy docs  ===> ', () => {
  it(
    'Copy docs',
    done => {
      got('http://localhost:7000/v1/documents/move-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          destinationUrl: '/test-images/',
          docType: '5c10d160a258192a68f957ab',
          docId: '5bea71d75776291e9a37c1c6',
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
