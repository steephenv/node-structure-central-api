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
    let limit = 50;
    let skip = 0;
    let condition: any = {};
    if (req.query && req.query.limit) {
      limit = req.query.limit;
    }
    if (req.query && req.query.skip) {
      skip = req.query.skip;
    }
    if (req.query && req.query.caseId) {
      condition = {
        caseId: mongoose.Types.ObjectId(req.query.caseId),
        isDelete: false,
      };
    } else if (req.query && req.query.date) {
      const startTime = new Date(
        new Date(req.query.date).setUTCHours(0, 0, 0, 0),
      );
      const endTime = new Date(
        new Date(req.query.date).setUTCHours(23, 59, 59, 999),
      );
      condition = {
        isDelete: false,
        hearingDate: { $gte: startTime, $lte: endTime },
      };
    } else {
      condition = { isDelete: false };
    }

    const hearingData = await CaseHearing.find(condition)
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
      .limit(limit)
      .skip(skip)
      .exec();

    const countOfRecords = await CaseHearing.countDocuments(condition).exec();

    return res.send({
      success: true,
      data: hearingData,
      totalRecords: countOfRecords,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
