import * as got from 'got';

describe('Test for signup functionality  ===> ', () => {
  it('Registration Functionality', done => {
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
            email: 'watson@yopmail.com',
            emailDiv: 'dfhjdgjh',
            password: '123456',
            role: '5be2c307c7311236010d35a2',
            _options: {
              skipIfExistingOnCondition: {
                email: 'watson@yopmail.com',
              },
            },
          },
        ],
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
  it('Registration Functionality Update', done => {
    got('http://localhost:7000/v1/central/update', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        collection: 'User',
        operation: 'Update',
        condition: {
          email: 'sherlock@yopmail.com',
        },
        content: {
          __set: { firstNameEng: 'Sherrrrlock' },
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
  it('Registration Functionality FEtch', done => {
    got('http://localhost:7000/v1/central/fetch', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        collection: 'User',
        condition: {
          email: 'sherlock@yopmail.com',
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
  it('Registration Functionality Update', done => {
    got('http://localhost:7000/v1/central/remove', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      json: true,
      body: {
        collection: 'User',
        operation: 'Remove',
        condition: {
          email: 'sherlock@yopmail.com',
        },
      },
    })
      .then(() => done())
      .catch(err => {
        throw err;
      });
  }, 15000);
});
