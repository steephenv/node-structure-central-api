import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { User } from '../../models/User';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const existingUser = await User.countDocuments({
      email: req.body.email,
    }).exec();
    if (existingUser) {
      return next(new RequestError(RequestErrorType.CONFLICT));
    }
    const newUser = new User(req.body);
    const result = await newUser.save();
    return res.status(201).send({
      success: true,
      result,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
