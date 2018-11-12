import { arraySchema } from './create-user-rule';
import { roleAddSchema } from './create-role-rule';
import { permissionAddSchema } from './create-permission-rule';

export const schemaRules: any = {
  'user-save': { opn: { allowUnknown: true }, schema: arraySchema },
  'role-save': { opn: { allowUnknown: true }, schema: roleAddSchema },
  'permission-save': {
    opn: { allowUnknown: true },
    schema: permissionAddSchema,
  },
};
