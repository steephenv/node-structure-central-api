import * as Joi from 'joi';
// tslint:disable:variable-name
export const permissionSchema = Joi.object().keys({
  permissions: Joi.array().required(),
});

export const permissionAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(permissionSchema)
    .min(1)
    .required(),
});
