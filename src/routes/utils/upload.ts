import { join as pathJoin } from 'path';
import * as mkdirpCb from 'mkdirp';
import { promisify } from 'bluebird';
import { RequestHandler } from 'express';
import * as userHome from 'user-home';

const mkdirp = promisify(mkdirpCb);

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const uploadFile: RequestHandler = async (req, res, next) => {
  try {
    const dir = pathJoin(userHome, 'uploads', req.body.type);
    await mkdirp(dir);
    req.body.folderPath = dir;
    next();
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
