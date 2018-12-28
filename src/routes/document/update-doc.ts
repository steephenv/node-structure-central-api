/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Document as Doc } from '../../models/Document';
import { DocumentStatusLog } from '../../models/DocStatusLog';

export const updateDocument: RequestHandler = async (req, res, next) => {
  try {
    const docId = req.body.docId;
    delete req.body.docId;
    const obj = req.body;

    const document: any = await Doc.updateOne(
      { _id: docId },
      { $set: obj },
    ).exec();

    const latestStatusObj = await DocumentStatusLog.find({
      documentId: docId,
    })
      .sort('-createdAt')
      .lean()
      .exec();

    if (
      latestStatusObj.length &&
      latestStatusObj[0].status !== req.body.status
    ) {
      const newLog = new DocumentStatusLog({
        documentId: docId,
        createdAt: new Date(),
        status: req.body.status,
        msg: `Status changed from ${latestStatusObj[0].status} to ${
          req.body.status
        }`,
        createdBy: res.locals.user.userId,
      });
      await newLog.save();
    }

    return res.status(200).send({ success: true, result: document });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
