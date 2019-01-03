/* tslint:disable:variable-name */
import { AppData } from './AppData';
import { User as user } from './User';
import { Role as role } from './Role';
import { Permission as permission } from './Permission';
import { Activity as activity } from './Activity';

export const Models: { [key: string]: typeof AppData } = {
  user,
  role,
  permission,
  activity,
};
