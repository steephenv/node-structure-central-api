/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
// import * as lme from 'lme';

export const fetchCases: RequestHandler = async (req, res, next) => {
  try {
    const caseData = await CaseDetails.findOne({
      _id: req.query.caseId,
    })
      .populate([
        {
          path: 'typeOfCase',
          model: 'CaseType',
        },
        {
          path: 'caseStatus',
          model: 'CaseStatus',
        },
        {
          path: 'caseParticipants.role',
          model: 'CaseParticipantRole',
        },
        {
          path: 'caseStaffs.attorney',
          model: 'User',
          populate: {
            path: 'role',
            model: 'Role',
          },
        },
        {
          path: 'caseHearingType',
          role: 'CaseHearingType',
        },
      ])
      .exec();
    // lme.i(caseData);
    return res.send({ success: true, data: caseData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
