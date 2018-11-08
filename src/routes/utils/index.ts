import * as express from 'express';
import * as userHome from 'user-home';
import * as multer from 'multer';
import { join as pathJoin } from 'path';

const upload = multer({ dest: pathJoin(userHome, 'tmp') });

export const utils = express.Router();

utils.post('/upload', upload.single('file'));
