import { arraySchema } from './create-user-rule';
import { roleAddSchema } from './create-role-rule';
import { permissionAddSchema } from './create-permission-rule';
import { documentAddSchema } from './create-document-rule';
import { shelfAddSchema } from './create-shelf-rule';
import { caseAddSchema } from './create-case-rule';
import { holidayAddSchema } from './create-holiday-rule';
import { leaveTypeAddSchema } from './create-leavetype-rule';
import { leaveAddSchema } from './create-leave-rule';
import { docTypeAddSchema } from './create-doctype-rule';
import { departmentAddSchema } from './create-department-rule';
import { salutationAddSchema } from './create-salutation-rule';
import { caseTypeAddSchema } from './create-casetype-rule';
import { caseStatusAddSchema } from './create-casestatus-rule';
import { caseHearingTypeRuleSchemaAddSchema } from './create-casehearingtype-rule';
import { caseParticipantRoleAddSchema } from './create-caseparticipantrole-rule';
import { departSectionAddSchema } from './create-departmentsection-rule';
import { contactAddSchema } from './create-contact-rule';
import { taskAddSchema } from './create-task-rule';

export const schemaRules: any = {
  'user-save': { opn: { allowUnknown: true }, schema: arraySchema },
  'role-save': { opn: { allowUnknown: true }, schema: roleAddSchema },
  'permission-save': {
    opn: { allowUnknown: true },
    schema: permissionAddSchema,
  },
  'document-save': { opn: { allowUnknown: true }, schema: documentAddSchema },
  'shelf-save': {
    opn: { allowUnknown: true },
    schema: shelfAddSchema,
  },
  'casedetails-save': { opn: { allowUnknown: true }, schema: caseAddSchema },
  'holiday-save': { opn: { allowUnknown: true }, schema: holidayAddSchema },
  'leavetype-save': { opn: { allowUnknown: true }, schema: leaveTypeAddSchema },
  'leave-save': { opn: { allowUnknown: true }, schema: leaveAddSchema },
  'doctype-save': { opn: { allowUnknown: true }, schema: docTypeAddSchema },
  'department-save': {
    opn: { allowUnknown: true },
    schema: departmentAddSchema,
  },
  'salutation-save': {
    opn: { allowUnknown: true },
    schema: salutationAddSchema,
  },
  'casetype-save': { opn: { allowUnknown: true }, schema: caseTypeAddSchema },
  'casestatus-save': {
    opn: { allowUnknown: true },
    schema: caseStatusAddSchema,
  },
  'casehearingtype-save': {
    opn: { allowUnknown: true },
    schema: caseHearingTypeRuleSchemaAddSchema,
  },
  'caseparticipantrole-save': {
    opn: { allowUnknown: true },
    schema: caseParticipantRoleAddSchema,
  },
  'departmentsection-save': {
    opn: { allowUnknown: true },
    schema: departSectionAddSchema,
  },
  'contact-save': {
    opn: { allowUnknown: true },
    schema: contactAddSchema,
  },
  'task-save': {
    opn: { allowUnknown: true },
    schema: taskAddSchema,
  },
};
