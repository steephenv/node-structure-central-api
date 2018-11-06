import { User } from '../models/User';
import { Promise as BluePromise } from 'bluebird';

const user1 = new User({
  email: 'sherlock@yopmail.com',
  password: '123456',
  role: 'BPM',
});

const user2 = new User({
  firstName: 'Bernad',
  lastName: 'Shah',
  email: 'bernu@yopmail.com',
  password: '123456',
  role: 'Client',
});

export const initUsers = async () => {
  await BluePromise.all([user1.save(), user2.save()]);
};
