/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { prepareGQLQuery } from '../../utils/prepare-gql-query';

import { Models } from '../../models';

export const updateOperation: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.condition || !req.body.content) {
      return res.status(422).send({
        success: false,
        msg: 'Invalid Parameters',
      });
    }
    if (!req.body.options) {
      req.body.options = {};
    }
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
  } catch (err) {
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
