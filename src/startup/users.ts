import { User } from '../models/User';
import { Promise as BluePromise } from 'bluebird';

const user1 = new User({
  email: 'sherlock@yopmail.com',
  password: '123456',
  role: '5be3c9d9c7311236010d35a8',
});

const user2 = new User({
  firstName: 'Bernad11',
  lastName: 'Shah',
  email: 'bernu@yopmail.com',
  password: '123456',
  role: '5be3c9d9c7311236010d35a8',
});

export const initUsers = async () => {
  await BluePromise.all([user1.save(), user2.save()]);
};
