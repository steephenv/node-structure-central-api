/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';
import * as fs from 'fs';
import { join as pathJoin } from 'path';

import * as userHome from 'user-home';

import { Document as Doc } from '../../models/Document';

import { copyFileFunction } from './copy-doc';

export const UPLOAD_DIR = pathJoin(userHome, 'cma-uploads');

export const unlinkFunction = async (oldPath: string) => {
  const sourceRel = oldPath.replace('assets/', '');
  const sourcePath = pathJoin(UPLOAD_DIR, sourceRel);

  return await new BluePromise((resolve, reject) => {
    fs.unlink(sourcePath, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

export const moveDocument: RequestHandler = async (req, res, next) => {
  try {
    const document: any = await Doc.findOne({ _id: req.body.docId }).exec();

    if (!document) {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, 'No such document'),
      );
    }
    if (document.docType === req.body.docType) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, 'Doctype conflict'),
      );
    }

    const newUrl = await copyFileFunction(
      req.body.destinationUrl,
      document.docUrl,
    );

    await unlinkFunction(document.docUrl);

    document.updatedAt = new Date();
    document.docType = req.body.docType;
    document.docUrl = newUrl;

    await document.save();

    return res.status(201).send({ success: true });
  } catch (err) {
    console.log(err);
    if (err.statusCode === 409) {
      return next(new RequestError(RequestErrorType.CONFLICT));
    }
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
