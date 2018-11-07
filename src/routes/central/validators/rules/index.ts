import { arraySchema } from './create-user-rule';
import { roleAddSchema } from './create-role-rule';

export const schemaRules: any = {
  'user-save': { opn: { allowUnknown: true }, schema: arraySchema },
  'role-save': { opn: { allowUnknown: true }, schema: roleAddSchema },
};
