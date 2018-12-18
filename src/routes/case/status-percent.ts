/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { CaseDetails } from '../../models/Case';
import { CaseStatus } from '../../models/CaseStatus';
import { CaseType } from '../../models/CaseTypes';
// import * as lme from 'lme';

export const statusCount: RequestHandler = async (req, res, next) => {
  try {
    const types = await CaseType.find({ isDelete: false })
      .lean()
      .exec();
    const resultData = await BluePromise.map(types, async (cType: any) => {
      const typeData = cType;
      const caseData = await CaseDetails.aggregate([
        { $match: { isDelete: false, typeOfCase: cType._id } },
        { $group: { _id: '$caseStatus', noOfRecords: { $sum: 1 } } },
      ]).exec();
      if (caseData.length) {
        const resultRec = await CaseStatus.populate(caseData, {
          path: '_id',
        });
        typeData.case = resultRec;
      } else {
        typeData.case = [];
      }

      return typeData;
    });
    // lme.i('..', resultData);
    return res.send({ success: true, data: resultData });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
