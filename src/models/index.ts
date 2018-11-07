/* tslint:disable:variable-name */
import { AppData } from './AppData';
import { User as user } from './User';
import { Role as role } from './Role';

export const Models: { [key: string]: typeof AppData } = {
  user,
  role,
};
