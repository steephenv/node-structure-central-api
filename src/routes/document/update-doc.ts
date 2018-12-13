/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Document as Doc } from '../../models/Document';

export const updateDocument: RequestHandler = async (req, res, next) => {
  try {
    const docId = req.body.docId;
    delete req.body.docId;
    const obj = req.body;
    console.log('.................', obj);
    const document: any = await Doc.updateOne(
      { _id: docId },
      { $set: obj },
    ).exec();
    return res.status(200).send({ success: true, result: document });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
