/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
import { CaseStatus } from '../../models/CaseStatus';
// import * as lme from 'lme';

export const statusCount: RequestHandler = async (req, res, next) => {
  try {
    const caseData = await CaseDetails.aggregate([
      { $match: { isDelete: false } },
      { $group: { _id: '$caseStatus', noOfRecords: { $sum: 1 } } },
    ]).exec();
    const resultRec = await CaseStatus.populate(caseData, { path: '_id' });
    // lme.i(resultRec);
    return res.send({ success: true, data: caseData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
