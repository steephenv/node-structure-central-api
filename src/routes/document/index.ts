import * as express from 'express';

import { docCopyRules } from './validators/copy-doc-rule';

import { listDocsFolders } from '../document/list-documents';
import { copyDoc } from '../document/copy-doc';

export const docs = express.Router();

docs.get('/list-folders', listDocsFolders);
docs.post('/copy-doc', docCopyRules, copyDoc);
