/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import * as mongoose from 'mongoose';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';
import { Promise as BluePromise } from 'bluebird';

import { CaseHearing } from '../../models/CaseHearing';
import { CaseDetails } from '../../models/Case';
import { User } from '../../models/User';

import * as lme from 'lme';

export const fetchHearings: RequestHandler = async (req, res, next) => {
  try {
    let limit = 50;
    let skip = 0;
    const condition: any = { isDelete: false };
    let caseIds: any = [];
    if (req.query && req.query.limit) {
      limit = parseInt(req.query.limit, 10);
    }
    if (req.query && req.query.skip) {
      skip = parseInt(req.query.skip, 10);
    }
    if (req.query) {
      if (req.query.caseId) {
        condition.caseId = mongoose.Types.ObjectId(req.query.caseId);
      }
      if (req.query.date) {
        const startTime = new Date(
          new Date(req.query.date).setUTCHours(0, 0, 0, 0),
        );
        const endTime = new Date(
          new Date(req.query.date).setUTCHours(23, 59, 59, 999),
        );
        condition.hearingDate = { $gte: startTime, $lte: endTime };
      }
      if (req.query.startDate && req.query.endDate) {
        const startTime = new Date(
          new Date(req.query.startDate).setUTCHours(0, 0, 0, 0),
        );
        const endTime = new Date(
          new Date(req.query.endDate).setUTCHours(23, 59, 59, 999),
        );
        condition.hearingDate = { $gte: startTime, $lte: endTime };
      }
      if (req.query.searchText) {
        const caseIDs = CaseDetails.find({
          $or: [
            {
              court: {
                $regex: req.query.searchText,
                $options: 'ig',
              },
              courtDiv: {
                $regex: req.query.searchText,
                $options: 'ig',
              },
              'caseParticipants.party': {
                $regex: req.query.searchText,
                $options: 'ig',
              },
              'caseParticipants.partyDiv': {
                $regex: req.query.searchText,
                $options: 'ig',
              },
              caseNumber: {
                $regex: req.query.searchText,
                $options: 'ig',
              },
            },
          ],
        })
          .distinct('_id')
          .exec();

        const userIDs = User.find({
          $or: [
            {
              firstName: { $regex: req.query.searchText, $options: 'ig' },
            },
            {
              lastName: { $regex: req.query.searchText, $options: 'ig' },
            },
          ],
        })
          .distinct('_id')
          .exec();

        const resultObj = await BluePromise.all([caseIDs, userIDs]);

        condition.$or = [
          {
            caseId: { $in: resultObj[0] },
          },
          {
            attorney: { $in: resultObj[1] },
          },
        ];
      }
      if (req.query.caseType) {
        caseIds = await CaseDetails.find({
          typeOfCase: req.query.caseType,
        })
          .distinct('_id')
          .exec();

        condition.caseId = { $in: caseIds };
      }
    }

    lme.i(condition);

    const hearingData = await CaseHearing.find(condition)
      .populate([
        { path: 'caseId', model: 'CaseDetails' },
        {
          path: 'attorney',
          model: 'User',
          select: { firstName: 1, lastName: 1 },
        },
        {
          path: 'caseHearingType',
          model: 'CaseHearingType',
        },
      ])
      .limit(limit)
      .skip(skip)
      .exec();

    const countOfRecords = await CaseHearing.countDocuments(condition).exec();

    lme.i(hearingData.length);

    return res.send({
      success: true,
      data: hearingData,
      totalRecords: countOfRecords,
    });
  } catch (err) {
    console.log(err);
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
