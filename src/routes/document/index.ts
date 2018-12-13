import * as express from 'express';

import { listDocsFolders } from '../document/list-documents';
import { updateDocs } from '../document/update-doc';

export const docs = express.Router();

docs.get('/list-folders', listDocsFolders);
docs.post('/update-docs', updateDocs);
