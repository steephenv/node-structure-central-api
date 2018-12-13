/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Document as Doc } from '../../models/Document';

import { unlinkFunction } from './move-doc';

export const delDocument: RequestHandler = async (req, res, next) => {
  try {
    const document: any = await Doc.findOne({ _id: req.query.docId })
      .lean()
      .exec();

    if (document.docUrl) {
      await unlinkFunction(document.docUrl);
    }

    await Doc.remove({ _id: req.query.docId }).exec();

    return res.status(201).send({ success: true });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
