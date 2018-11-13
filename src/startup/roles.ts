import { Role } from '../models/Role';
import { Promise as BluePromise } from 'bluebird';

const role1 = new Role({
  role: 'User',
  displayNameEng: 'User',
  displayNameDiv: 'User',
});

const role2 = new Role({
  role: 'Council',
  displayNameEng: 'Council',
  displayNameDiv: 'Council',
});

export const initRoles = async () => {
  await BluePromise.all([role1.save(), role2.save()]);
};
