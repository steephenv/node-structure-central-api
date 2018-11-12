/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = `For adding permissions`;
export const definitions = {
  permissions: [{ type: String }],
};

const permissionSchema = new Schema(definitions);

export const Permission = mongooseModel('permission', permissionSchema);
