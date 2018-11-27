/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
import { messages } from '../../config/app/messages';

export const addParticipants: RequestHandler = async (req, res, next) => {
  try {
    const condition: any = {
      _id: req.body.caseId,
      'caseParticipants.role': req.body.role,
    };
    if (req.body.id) {
      condition['caseParticipants._id'] = { $ne: req.body.id };
    }

    const participant = await CaseDetails.find(condition).exec();
    if (participant.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.CaseDuplicate),
      );
    }

    if (req.body.id) {
      await CaseDetails.update(
        { 'caseParticipants._id': req.body.id },
        {
          $set: {
            'caseParticipants.$.role': req.body.role,
            'caseParticipants.$.status': req.body.status,
            'caseParticipants.$.party': req.body.party,
          },
        },
      ).exec();
    } else {
      await CaseDetails.update(
        { _id: req.body.caseId },
        {
          $push: {
            caseParticipants: {
              role: req.body.role,
              status: req.body.status,
              party: req.body.party,
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
