/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { prepareGQLQuery } from '../../utils/prepare-gql-query';

import { Models } from '../../models';

export const fetchOperation: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.collection) {
      return next(
        new RequestError(
          RequestErrorType.BAD_REQUEST,
          'Invalid collection name',
        ),
      );
    }
    req.body.collection = req.body.collection.toLowerCase();

    req.body.condition = req.body.condition || {};
    req.body.attachments = req.body.attachments || [];
    req.body.fields = req.body.fields || '';
    req.body.populate = req.body.populate || {};
    req.body.limit = req.body.limit || 50;
    req.body.skip = req.body.skip || 0;
    req.body.selectingFields = req.body.selectingFields || '';
    req.body.distinct = req.body.distinct || '';
    req.body.sort = req.body.sort || null;
    req.body.isCount = req.body.isCount || false;

    let preparedQuery: any;
    preparedQuery = prepareGQLQuery(req.body.condition);
    const conditionOnly = preparedQuery;

    let prepareResult = Models[req.body.collection].find(preparedQuery);

    if (req.body.attachments) {
      req.body.attachments.forEach((attach: any) => {
        prepareResult.populate(attach, req.body.fields);
      });
    }

    if (Object.keys(req.body.populate).length) {
      prepareResult.populate(req.body.populate);
    }
    // console.log(',,,,,,,,,,,,,,,,,,,,', typeof fields, fields);

    if (req.body.distinct) {
      prepareResult = prepareResult
        .select(req.body.selectingFields)
        .distinct(req.body.distinct);
    } else {
      prepareResult = prepareResult
        .limit(req.body.limit)
        .skip(req.body.skip)
        .select(req.body.selectingFields);
    }

    if (req.body.sort) {
      prepareResult.sort(req.body.sort);
    }

    // lean last
    prepareResult.lean();
    const result = await prepareResult.exec();
    const response: any = {
      success: true,
      data: result,
    };
    if (req.body.isCount) {
      const contentCount = await Models[req.body.collection]
        .count(conditionOnly)
        .exec();
      response.totalCount = contentCount;
    }
    return res.status(200).send(response);
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
