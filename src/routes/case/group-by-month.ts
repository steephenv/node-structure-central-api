/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
// import * as lme from 'lme';

export const groupByMonth: RequestHandler = async (req, res, next) => {
  try {
    const monthWiseData = await CaseDetails.aggregate([
      { $match: { isDelete: false } },
      {
        $group: {
          _id: {
            year: { $year: '$caseSubmittedDate' },
            month: { $month: '$caseSubmittedDate' },
          },
          totalCases: { $sum: 1 },
        },
      },
    ]).exec();
    // lme.i(monthWiseData);
    return res.send({ success: true, data: monthWiseData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
