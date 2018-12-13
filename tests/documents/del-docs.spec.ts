import * as got from 'got';

describe('Test for Delete docs  ===> ', () => {
  it(
    'Delete docs',
    done => {
      got(
        'http://localhost:7000/v1/documents/del-doc?docId=5c1242428688b4d64997f324',
        {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          json: true,
        },
      )
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
