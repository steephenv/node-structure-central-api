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
    const result = await BluePromise.map(
      req.body.content,
      async (item: any) => {
        // attach userId if not present
        if (!item.userId) {
          item.userId = res.locals.user ? res.locals.user.userId : null;
        }
        const { _options } = item;

        req.body.collection = req.body.collection.toLowerCase();

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
      },
    );
    return res.status(201).send({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
