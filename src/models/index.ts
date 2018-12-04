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
import { Department as department } from './Department';
import { Salutation as salutation } from './Salutation';
import { CaseType as casetype } from './CaseTypes';
import { CaseStatus as casestatus } from './CaseStatus';
import { CaseHearingType as casehearingtype } from './CaseHearingTypes';
import { CaseParticipantRole as caseparticipantrole } from './CaseParticipantsRole';
import { DepartmentSection as departmentsection } from './DepartmentSection';
import { Atoll as atoll } from './Atoll';
import { Island as island } from './Island';
import { Contact as contact } from './Contacts';
import { Task as task } from './Task';
import { ContactType as contacttype } from './ContactType';
import { Organization as organization } from './Organization';

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
  department,
  salutation,
  casetype,
  casestatus,
  casehearingtype,
  caseparticipantrole,
  departmentsection,
  atoll,
  island,
  contact,
  task,
  contacttype,
  organization,
};
