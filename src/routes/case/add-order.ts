/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
import { messages } from '../../config/app/messages';

export const addOrders: RequestHandler = async (req, res, next) => {
  try {
    const condition: any = {
      _id: req.body.caseId,
      'caseOrders.order': req.body.order,
      'caseOrders.orderDate': req.body.orderDate,
    };
    if (req.body.id) {
      condition['caseOrders._id'] = { $ne: req.body.id };
    }

    const order = await CaseDetails.find(condition).exec();
    if (order.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.CaseDuplicate),
      );
    }

    const orderDivi = req.body.orderDiv || '';

    if (req.body.id) {
      await CaseDetails.update(
        { 'caseOrders._id': req.body.id },
        {
          $set: {
            'caseOrders.$.order': req.body.order,
            'caseOrders.$.orderDate': req.body.orderDate,
            'caseOrders.$.orderDiv': orderDivi,
          },
        },
      ).exec();
    } else {
      await CaseDetails.update(
        { _id: req.body.caseId },
        {
          $push: {
            caseOrders: {
              orderDate: req.body.orderDate,
              order: req.body.order,
              orderDiv: orderDivi,
            },
          },
        },
      ).exec();
    }
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
