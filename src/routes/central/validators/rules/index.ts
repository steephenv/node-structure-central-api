import { arraySchema } from './create-user-rule';

export const schemaRules: any = {
  'User-Save': { opn: { allowUnknown: true }, schema: arraySchema },
};
