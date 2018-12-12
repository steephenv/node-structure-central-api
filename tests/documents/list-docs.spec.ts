import * as got from 'got';

describe('Test for list docs  ===> ', () => {
  it(
    'List docs',
    done => {
      got(
        'http://localhost:7000/v1/documents/list-folders?caseId=5bee9acd04caea06b0b38e1a',
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
