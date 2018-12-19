/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseHearing } from '../../models/CaseHearing';

export const addHearing: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.id) {
      const objId = req.body.id;
      delete req.body._id;
      await CaseHearing.updateOne({ _id: objId }, { $set: req.body }).exec();
    } else {
      const hearing = new CaseHearing(req.body);
      await hearing.save();
    }
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
