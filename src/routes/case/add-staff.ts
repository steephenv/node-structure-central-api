/* tslint:disable:no-console */
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
import { StaffNotification } from '../../models/StaffNotification';
import { messages } from '../../config/app/messages';

export const addStaffs: RequestHandler = async (req, res, next) => {
  try {
    const condition: any = {
      _id: req.body.caseId,
      'caseStaffs.attorney': req.body.attorney,
    };
    if (req.body.id) {
      condition['caseStaffs._id'] = { $ne: req.body.id };
    }

    const staff = await CaseDetails.find(condition).exec();
    if (staff.length) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, messages.CaseDuplicate),
      );
    }

    const statusDivi = req.body.statusDiv || '';
    if (req.body.id) {
      await CaseDetails.update(
        { 'caseStaffs._id': req.body.id },
        {
          $set: {
            'caseStaffs.$.attorney': req.body.attorney,
            'caseStaffs.$.role': req.body.role,
            'caseStaffs.$.status': req.body.status,
            'caseStaffs.$.assignedBy': req.body.assignedBy,
            'caseStaffs.$.statusDiv': statusDivi,
          },
        },
      ).exec();
    } else {
      await CaseDetails.update(
        { _id: req.body.caseId },
        {
          $push: {
            caseStaffs: {
              role: req.body.role,
              status: req.body.status,
              attorney: req.body.attorney,
              assignedBy: req.body.assignedBy,
              statusDiv: statusDivi,
            },
          },
        },
      ).exec();
      const newNotification = new StaffNotification({
        userId: req.body.attorney,
        caseId: req.body.caseId,
        createdAt: new Date(),
        createdBy: res.locals.user.userId,
        msg: `A new Case assigned`,
      });
      await newNotification.save();
    }
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
