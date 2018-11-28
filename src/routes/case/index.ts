import * as express from 'express';
import { caseParticipantRules } from './validators/add-participants-rule';
import { caseStaffRules } from './validators/add-staff-rule';
import { caseHearingRules } from './validators/add-hearings-rule';

import { addParticipants } from '../case/add-participant';
import { addStaffs } from '../case/add-staff';
import { addHearing } from '../case/add-hearing';

export const caseRouter = express.Router();

caseRouter.post('/add-participant', caseParticipantRules, addParticipants);
caseRouter.post('/add-staff', caseStaffRules, addStaffs);
caseRouter.post('/add-hearing', caseHearingRules, addHearing);
