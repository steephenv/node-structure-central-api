/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { prepareGQLQuery } from '../../utils/prepare-gql-query';

import { Models } from '../../models';

import { generatePdf } from '../utils/pdf-generation';

export const pdfOperation: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.collection || !req.body.type || !req.body.condition) {
      return next(
        new RequestError(
          RequestErrorType.BAD_REQUEST,
          'Invalid parameters - no collection or type',
        ),
      );
    }

    req.body.collection = req.body.collection.toLowerCase();

    req.body.condition = req.body.condition || {};
    req.body.attachments = req.body.attachments || [];
    req.body.fields = req.body.fields || '';
    req.body.populate = req.body.populate || {};

    let preparedQuery: any;
    preparedQuery = prepareGQLQuery(req.body.condition);

    const prepareResult = Models[req.body.collection].find(preparedQuery);

    if (req.body.attachments) {
      req.body.attachments.forEach((attach: any) => {
        prepareResult.populate(attach, req.body.fields);
      });
    }

    if (Object.keys(req.body.populate).length) {
      prepareResult.populate(req.body.populate);
    }
    prepareResult.lean();

    const result = await prepareResult.exec();

    req.body.data = result;

    generatePdf(req, res, next);
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.BAD_REQUEST, err));
  }
};
