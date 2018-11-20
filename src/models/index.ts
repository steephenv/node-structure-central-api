/* tslint:disable:variable-name */
import { AppData } from './AppData';
import { User as user } from './User';
import { Role as role } from './Role';
import { Permission as permission } from './Permission';
import { CaseDetails as casedetails } from './Case';
import { Document as document } from './Document';
import { Shelf as shelf } from './Shelf';
import { Holiday as holiday } from './Holiday';
import { LeaveType as leavetype } from './LeaveTypes';
import { Leave as leave } from './Leave';
import { DocType as doctype } from './DocType';

export const Models: { [key: string]: typeof AppData } = {
  user,
  role,
  permission,
  casedetails,
  document,
  shelf,
  holiday,
  leavetype,
  leave,
  doctype,
};
