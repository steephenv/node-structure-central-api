import * as multer from 'multer';
import * as express from 'express';
import { Request } from 'express';
import { join as pathJoin } from 'path';
import { promisify } from 'bluebird';
import * as userHome from 'user-home';
import * as mkdirpCb from 'mkdirp';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

const mkdirp = promisify(mkdirpCb);

export const utils = express.Router();

export const UPLOAD_DIR = pathJoin(userHome, 'cma-uploads');

const storageC: any = multer.diskStorage({
  destination: async (req: Request, file, cb) => {
    const relDir = req.query.relDir || 'untitled';
    const absDir = pathJoin(UPLOAD_DIR, relDir);

    // try {
    await mkdirp(absDir);
    // } catch (err) {
    //   return next(new RequestError(RequestErrorType.LOGIN_FAILED, err));
    // }

    return cb(null, absDir);
  },
  filename: (req, file, cb) => {
    file.originalname = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storageC });

utils.post('/upload', upload.single('file'), (req, res, next) => {
  const relAccessUrl = 'assets/' + req.file.path.split(UPLOAD_DIR + '/')[1];
  return res.status(201).send({
    relAccessUrl,
  });
});
