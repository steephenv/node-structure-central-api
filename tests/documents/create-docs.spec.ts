import * as got from 'got';

describe('Test for create docs  ===> ', () => {
  it(
    'create docs',
    done => {
      got('http://localhost:7000/v1/documents/create-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          docUrl: 'images/1544684606177-800.jpg',
          docTitle: 'vvvvvv',
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
