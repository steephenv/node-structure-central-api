import * as got from 'got';

describe('Test for list docs  ===> ', () => {
  it(
    'List docs',
    done => {
      got(
        'http://localhost:7000/v1/documents/list-folders?caseId=123564978312654231',
        {
          method: 'GET',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
        },
      )
        .then(() => done())
        .catch(err => {
          throw err;
        });
    },
    15000,
  );
});
