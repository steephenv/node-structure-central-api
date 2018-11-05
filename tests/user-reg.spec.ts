import * as got from 'got';

describe('Test for signup functionality  ===> ', () => {
  it(
    'Registration Functionality',
    done => {
      got('http://localhost:7000/v1/central/create', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        json: true,
        body: {
          collection: 'User',
          operation: 'Save',
          content: [
            {
              email: 'll@yopmail.com',
              emailDiv: 'dfhjdgjh',
            },
          ],
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
