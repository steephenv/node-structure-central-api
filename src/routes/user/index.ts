import * as express from 'express';
import { errValidator } from '../../error-handler/error-validator';
import { loginRule } from './validators/login.rules';

import { login } from '../user/login';

export const user = express.Router();

user.post('/login', loginRule, errValidator, login);
