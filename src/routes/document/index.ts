import * as express from 'express';

import { docCopyRules } from './validators/copy-doc-rule';
import { docDelRules } from './validators/delete-doc-rule';

import { listDocsFolders } from '../document/list-documents';
import { copyDoc } from '../document/copy-doc';
import { moveDocument } from '../document/move-doc';
import { delDocument } from '../document/delete-doc';

export const docs = express.Router();

docs.get('/list-folders', listDocsFolders);
docs.post('/copy-doc', docCopyRules, copyDoc);
docs.post('/move-doc', docCopyRules, moveDocument);
docs.delete('/del-doc', docDelRules, delDocument);
