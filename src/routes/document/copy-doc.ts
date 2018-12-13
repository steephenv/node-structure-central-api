/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';
import * as fs from 'fs';
import { join as pathJoin } from 'path';
import { promisify } from 'bluebird';
import * as userHome from 'user-home';
import * as mkdirpCb from 'mkdirp';

const mkdirp = promisify(mkdirpCb);

export const UPLOAD_DIR = pathJoin(userHome, 'cma-uploads');

import { Document as Doc } from '../../models/Document';

export const copyDoc: RequestHandler = async (req, res, next) => {
  try {
    const document = await Doc.findOne({ _id: req.body.docId })
      .lean()
      .exec();

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

    const newDoc = document;
    newDoc.createdAt = new Date();
    newDoc.createdBy = res.locals.user ? res.locals.user.userId : null;
    newDoc.docType = req.body.docType;

    const relDir = req.body.destinationUrl || 'untitled';
    const absDir = pathJoin(UPLOAD_DIR, relDir);

    await mkdirp(absDir);

    const newFileName = newDoc.docUrl.substr(
      newDoc.docUrl.lastIndexOf('/') + 1,
    );
    const timeStamp = newFileName.split('-')[0];
    newFileName.replace(timeStamp, Date.now());

    const destination = pathJoin(absDir, newFileName);

    const sourceRel = newDoc.docUrl.replace('assets/', '');
    const sourcePath = pathJoin(UPLOAD_DIR, sourceRel);

    await new BluePromise((resolve, reject) => {
      fs.createReadStream(sourcePath)
        .pipe(fs.createWriteStream(destination))
        .on('finish', () => resolve())
        .on('error', err => reject(err));
    });

    newDoc.docUrl = pathJoin('assets', req.body.destinationUrl, newFileName);
    delete newDoc._id;
    const docObj = new Doc(newDoc);
    await docObj.save();

    return res.status(201).send({ success: true });
  } catch (err) {
    console.log(err);
    if (err.statusCode === 409) {
      return next(new RequestError(RequestErrorType.CONFLICT));
    }
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
// export const updateDocs: RequestHandler = async (req, res, next) => {
//   if (req.body.operation === 'copy') {
//     return copyFile(req, res, next);
//   }
// };
