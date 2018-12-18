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
    const monthArray: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthWiseData = await CaseDetails.aggregate([
      { $match: { isDelete: false } },
      {
        $group: {
          _id: {
            year: { $year: new Date() },
            month: { $month: '$caseSubmittedDate' },
          },
          totalCases: { $sum: 1 },
          submittedDate: { $first: '$caseSubmittedDate' },
        },
      },
    ]).exec();

    const monthResult = monthWiseData.map((obj: any) => {
      obj._id.monthName = monthArray[obj._id.month - 1];
      return obj;
    });
    return res.send({ success: true, data: monthResult });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
