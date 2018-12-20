/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { Models } from '../../models';

import { addActivity } from '../utils/add-activity';

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
            throw new RequestError(RequestErrorType.CONFLICT);
          }
        }
        item.createdAt = new Date();
        if (item.userId) {
          item.createdBy = item.userId;
        }
        await newCollection.create(item);

        if (
          req.body.collection === 'casedetails' ||
          req.body.collection === 'event' ||
          req.body.collection === 'task'
        ) {
          let textDesc = res.locals.user.userFullName || '';
          textDesc = textDesc + ' ' + 'created a new ' + req.body.collection;
          textDesc = textDesc + ' ' + item.caseTitle || item.title;
          await addActivity(textDesc, res);
        }
        return;
      },
    );
    return res.status(201).send({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err);
    if (err.statusCode === 409) {
      return next(new RequestError(RequestErrorType.CONFLICT));
    }
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
