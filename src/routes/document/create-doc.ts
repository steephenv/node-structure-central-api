/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Document as Doc } from '../../models/Document';

export const createDocument: RequestHandler = async (req, res, next) => {
  try {
    if (res.locals.user && res.locals.user.userId) {
      const access = req.body.accessRights || [];
      access.push(res.locals.user.userId);
      const accessSet = new Set(access);
      req.body.accessRights = [...accessSet];
    }

    req.body.createdBy = res.locals.user.userId;
    req.body.createdAt = new Date();

    const newDoc = new Doc(req.body);
    const savedDoc = newDoc.save();

    return res.status(201).send({
      success: true,
      savedDoc,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
