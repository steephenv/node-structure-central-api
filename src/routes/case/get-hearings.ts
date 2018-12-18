/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
// import * as lme from 'lme';

export const fetchHearings: RequestHandler = async (req, res, next) => {
  try {
    const startTime = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const endTime = new Date(new Date().setUTCHours(23, 59, 59, 999));

    const hearingData = await CaseDetails.find({
      isDelete: false,
      'caseHearings.hearingDate': { $gte: startTime, lte: endTime },
    })
      .populate([
        {
          path: 'caseHearings.caseHearingType',
          model: 'CaseHearingType',
        },
        {
          path: 'caseHearings.attorney',
          model: 'User',
          select: { firstName: 1, lastName: 1 },
        },
      ])
      .exec();
    return res.send({ success: true, data: hearingData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
