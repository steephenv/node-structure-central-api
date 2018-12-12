import * as express from 'express';

import { listDocsFolders } from '../document/list-documents';

export const docs = express.Router();

docs.get('/list-folders', listDocsFolders);
