import * as express from 'express';
import { caseParticipantRules } from './validators/add-participants-rule';
import { caseStaffRules } from './validators/add-staff-rule';
import { caseHearingRules } from './validators/add-hearings-rule';
import { caseOrderRules } from './validators/add-order-rule';
import { caseFetchRules } from './validators/fetch-case-rule';

import { addParticipants } from '../case/add-participant';
import { addStaffs } from '../case/add-staff';
import { addHearing } from '../case/add-hearing';
import { addOrders } from '../case/add-order';
import { fetchCases } from '../case/fetch-case';

export const caseRouter = express.Router();

caseRouter.post('/add-participant', caseParticipantRules, addParticipants);
caseRouter.post('/add-staff', caseStaffRules, addStaffs);
caseRouter.post('/add-hearing', caseHearingRules, addHearing);
caseRouter.post('/add-order', caseOrderRules, addOrders);
caseRouter.get('/fetch-case', caseFetchRules, fetchCases);
