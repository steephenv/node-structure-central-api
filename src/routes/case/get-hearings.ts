/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseHearing } from '../../models/CaseHearing';
// import * as lme from 'lme';

export const fetchHearings: RequestHandler = async (req, res, next) => {
  try {
    let hearingData: any = [];
    if (req.query && req.query.caseId) {
      hearingData = await CaseHearing.find({
        caseId: mongoose.Types.ObjectId(req.query.caseId),
        isDelete: false,
      })
        .populate([
          { path: 'caseId', model: 'CaseDetails' },
          {
            path: 'attorney',
            model: 'User',
            select: { firstName: 1, lastName: 1 },
          },
          {
            path: 'caseHearingType',
            model: 'CaseHearingType',
          },
        ])
        .exec();
    } else {
      const startTime = new Date(new Date().setUTCHours(0, 0, 0, 0));
      const endTime = new Date(new Date().setUTCHours(23, 59, 59, 999));

      hearingData = await CaseHearing.find({
        isDelete: false,
        hearingDate: { $gte: startTime, lte: endTime },
      })
        .populate([
          { path: 'caseId', model: 'CaseDetails' },
          {
            path: 'attorney',
            model: 'User',
            select: { firstName: 1, lastName: 1 },
          },
          {
            path: 'caseHearingType',
            model: 'CaseHearingType',
          },
        ])
        .exec();
    }
    return res.send({ success: true, data: hearingData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
