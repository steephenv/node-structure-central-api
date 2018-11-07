import { arraySchema } from './create-user-rule';

export const schemaRules: any = {
  'user-save': { opn: { allowUnknown: true }, schema: arraySchema },
};
