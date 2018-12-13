import * as got from 'got';

describe('Test for Share docs  ===> ', () => {
  it(
    'Share docs',
    done => {
      got('http://localhost:7000/v1/documents/share-doc', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          docId: '5bea71d75776291e9a36c1c6',
          accessRights: ['5c124de14f75646e740eaabf'],
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
