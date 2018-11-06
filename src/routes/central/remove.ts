/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { prepareGQLQuery } from '../../utils/prepare-gql-query';

import { Models } from '../../models';

export const removeOperation: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.condition || !req.body.collection) {
      return res.status(422).send({
        success: false,
        msg: 'Invalid Parameters',
      });
    }
    let preparedQuery: any;
    preparedQuery = prepareGQLQuery(req.body.condition);

    const resp = await Models[req.body.collection].remove(preparedQuery).exec();
    return res.status(200).send({
      success: true,
      msg: resp,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
