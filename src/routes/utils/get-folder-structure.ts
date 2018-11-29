import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { join as pathJoin } from 'path';
import * as userHome from 'user-home';
import { directoryTree } from './import-directory-tree';

export const folderStructure: RequestHandler = (req, res, next) => {
  try {
    const baseDir = pathJoin(userHome, 'cma-uploads');
    const givenDir = pathJoin(baseDir, req.body.folderPath);

    const tree = directoryTree(givenDir);

    return res.status(200).send({
      success: true,
      data: tree,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
