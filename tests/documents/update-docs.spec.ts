import * as got from 'got';

describe('Test for update docs  ===> ', () => {
  it(
    'update docs',
    done => {
      got('http://localhost:7000/v1/documents/update-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          docId: '5bea71d75776291e9a36c1c6',
          docUrl: 'images/1544684606177-800.jpg',
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
