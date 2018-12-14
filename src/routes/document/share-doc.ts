/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Document as Doc } from '../../models/Document';

export const shareDocument: RequestHandler = async (req, res, next) => {
  try {
    const document: any = await Doc.updateOne(
      { _id: req.body.docId },
      { $set: { accessRights: req.body.accessRights } },
    ).exec();
    return res.status(200).send({ success: true, result: document });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
