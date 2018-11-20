import * as Joi from 'joi';
// tslint:disable:variable-name
export const caseParticipantRoleRuleSchema = Joi.object().keys({
  caseHearingType: Joi.string().required(),
});

export const caseParticipantRoleAddSchema = Joi.object().keys({
  content: Joi.array()
    .items(caseParticipantRoleRuleSchema)
    .min(1)
    .required(),
});
