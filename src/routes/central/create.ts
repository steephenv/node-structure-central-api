/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Models } from '../../models';

import { Promise as BluePromise } from 'bluebird';

export const createOperation: RequestHandler = async (req, res, next) => {
  try {
    await BluePromise.map(req.body.content, async (item: any) => {
      // attach userId if not present
      if (!item.userId) {
        item.userId = res.locals.user ? res.locals.user.userId : null;
      }
      const { _options } = item;

      const newCollection = Models[req.body.collection];
      delete item._options;

      if (
        _options &&
        _options.skipIfExistingOnCondition &&
        Object.keys(_options.skipIfExistingOnCondition).length
      ) {
        const isExisting = await newCollection
          .count(_options.skipIfExistingOnCondition)
          .exec();
        if (isExisting) {
          return next(new RequestError(RequestErrorType.CONFLICT));
        }
      }
      item.createdAt = new Date();
      if (item.userId) {
        item.createdBy = item.userId;
      }
      return await newCollection.create(item);
    });
    return res.status(201).send({
      success: true,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
