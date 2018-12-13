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

import { Document as Doc } from '../../models/Document';

const mkdirp = promisify(mkdirpCb);

export const UPLOAD_DIR = pathJoin(userHome, 'cma-uploads');

export const copyFileFunction = async (destUrl: string, oldUrl: string) => {
  const relDir = destUrl;
  const absDir = pathJoin(UPLOAD_DIR, relDir);

  await mkdirp(absDir);

  const newFileName = oldUrl.substr(oldUrl.lastIndexOf('/') + 1);
  const timeStamp = newFileName.split('-')[0];
  newFileName.replace(timeStamp, Date.now().toString());

  const destination = pathJoin(absDir, newFileName);

  const sourceRel = oldUrl.replace('assets/', '');
  const sourcePath = pathJoin(UPLOAD_DIR, sourceRel);

  await new BluePromise((resolve, reject) => {
    fs.createReadStream(sourcePath)
      .pipe(fs.createWriteStream(destination))
      .on('finish', () => resolve())
      .on('error', err => reject(err));
  });

  return pathJoin('assets', destUrl, newFileName);
};

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
    const newUrl = await copyFileFunction(
      req.body.destinationUrl,
      newDoc.docUrl,
    );

    delete newDoc._id;
    newDoc.createdAt = new Date();
    newDoc.createdBy = res.locals.user ? res.locals.user.userId : null;
    newDoc.docType = req.body.docType;
    newDoc.docUrl = newUrl;

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
