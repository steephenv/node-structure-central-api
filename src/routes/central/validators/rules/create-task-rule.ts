import * as Joi from 'joi';
// tslint:disable:variable-name
export const taskSchema = Joi.object().keys({
  description: Joi.string()
    .trim()
    .required(),
  status: Joi.string()
    .trim()
    .required(),
  reminderDate: Joi.date().required(),
  dueDate: Joi.date().required(),
  assignedBy: Joi.string().required(),
});

export const taskAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(taskSchema)
    .min(1)
    .required(),
});
