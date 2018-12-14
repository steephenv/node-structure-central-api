import * as express from 'express';

import { docCopyRules } from './validators/copy-doc-rule';
import { docDelRules } from './validators/delete-doc-rule';
import { docShareRules } from './validators/share-doc-rule';
import { docUpdateRules } from './validators/update-doc-rule';
import { docCreateRules } from './validators/create-doc-rule';

import { listDocsFolders } from '../document/list-documents';
import { copyDoc } from '../document/copy-doc';
import { moveDocument } from '../document/move-doc';
import { delDocument } from '../document/delete-doc';
import { shareDocument } from '../document/share-doc';
import { updateDocument } from '../document/update-doc';
import { createDocument } from '../document/create-doc';

export const docs = express.Router();

docs.get('/list-folders', listDocsFolders);
docs.post('/copy-doc', docCopyRules, copyDoc);
docs.post('/move-doc', docCopyRules, moveDocument);
docs.delete('/del-doc', docDelRules, delDocument);
docs.post('/share-doc', docShareRules, shareDocument);
docs.post('/update-doc', docUpdateRules, updateDocument);
docs.post('/create-doc', docCreateRules, createDocument);
