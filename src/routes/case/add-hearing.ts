/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
import { messages } from '../../config/app/messages';

export const addHearing: RequestHandler = async (req, res, next) => {
  try {
    const condition: any = {
      _id: req.body.caseId,
      'caseHearings.hearingDate': req.body.hearingDate,
    };
    if (req.body.id) {
      condition['caseHearings._id'] = { $ne: req.body.id };
    }

    const staff = await CaseDetails.find(condition).exec();
    if (staff.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.CaseDuplicate),
      );
    }

    const resultDivVal = req.body.resultDiv || '';
    if (req.body.id) {
      await CaseDetails.update(
        { 'caseHearings._id': req.body.id },
        {
          $set: {
            'caseHearings.$.attorney': req.body.attorney,
            'caseHearings.$.result': req.body.result,
            'caseHearings.$.resultDiv': resultDivVal,
            'caseHearings.$.caseHearingType': req.body.caseHearingType,
            'caseHearings.$.hearingDate': req.body.hearingDate,
          },
        },
      ).exec();
    } else {
      await CaseDetails.update(
        { _id: req.body.caseId },
        {
          $push: {
            caseHearings: {
              attorney: req.body.attorney,
              result: req.body.result,
              resultDiv: resultDivVal,
              caseHearingType: req.body.caseHearingType,
              hearingDate: req.body.hearingDate,
            },
          },
        },
      ).exec();
    }
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
