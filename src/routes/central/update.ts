/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { prepareGQLQuery } from '../../utils/prepare-gql-query';

import { Models } from '../../models';

export const updateOperation: RequestHandler = async (req, res, next) => {
  try {
    if (req.body.constructor === Object) {
      if (!req.body.condition || !req.body.content || !req.body.collection) {
        return next(
          new RequestError(RequestErrorType.BAD_REQUEST, 'Invalid Parameters'),
        );
      }
      if (!req.body.options) {
        req.body.options = {};
      }

      req.body.collection = req.body.collection.toLowerCase();

      req.body.content.updatedAt = new Date();

      const preparedCondition = prepareGQLQuery(req.body.condition);
      const preparedContent = prepareGQLQuery(req.body.content);
      const preparedOptions = prepareGQLQuery(req.body.options);

      const newCollection = Models[req.body.collection];

      await newCollection
        .update(preparedCondition, preparedContent, preparedOptions)
        .exec();

      const updatedData = await newCollection.findOne(preparedCondition).exec();
      return res.status(200).send({
        success: true,
        data: updatedData,
      });
    } else if (req.body.constructor === Array) {
      const updatedData = await BluePromise.map(req.body, async (data: any) => {
        if (!data.condition || !data.content || !data.collection) {
          return next(
            new RequestError(
              RequestErrorType.BAD_REQUEST,
              'Invalid Parameters',
            ),
          );
        }
        if (!data.options) {
          data.options = {};
        }

        data.collection = data.collection.toLowerCase();

        data.content.updatedAt = new Date();

        const preparedCondition = prepareGQLQuery(data.condition);
        const preparedContent = prepareGQLQuery(data.content);
        const preparedOptions = prepareGQLQuery(data.options);

        const newCollection = Models[data.collection];

        await newCollection
          .update(preparedCondition, preparedContent, preparedOptions)
          .exec();

        return await newCollection.findOne(preparedCondition).exec();
      });
      return res.status(200).send({
        success: true,
        data: updatedData,
      });
    }
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
