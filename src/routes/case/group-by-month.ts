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
    const monthFullData = [
      { monthName: 'January', totalCases: 0, month: 1 },
      { monthName: 'February', totalCases: 0, month: 2 },
      { monthName: 'March', totalCases: 0, month: 3 },
      { monthName: 'April', totalCases: 0, month: 4 },
      { monthName: 'May', totalCases: 0, month: 5 },
      { monthName: 'June', totalCases: 0, month: 6 },
      { monthName: 'July', totalCases: 0, month: 7 },
      { monthName: 'August', totalCases: 0, month: 8 },
      { monthName: 'September', totalCases: 0, month: 9 },
      { monthName: 'October', totalCases: 0, month: 10 },
      { monthName: 'November', totalCases: 0, month: 11 },
      { monthName: 'December', totalCases: 0, month: 12 },
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

    if (!monthWiseData.length) {
      return monthFullData;
    } else {
      // await new BluePromise((resolve, reject) => {});
      for (const mf of monthFullData) {
        for (const mw of monthWiseData) {
          if (mf.month === mw._id.month) {
            mf.totalCases = mw.totalCases;
            break;
          }
        }
      }
    }

    return res.send({ success: true, data: monthFullData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
