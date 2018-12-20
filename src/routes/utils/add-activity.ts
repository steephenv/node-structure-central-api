import { Activity } from '../../models/Activity';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const addActivity = async (desc: string, res: any) => {
  try {
    const newActivity = new Activity({
      description: desc,
      createdAt: new Date(),
      createdBy: res.locals.user.userId,
    });
    return await newActivity.save();
  } catch (err) {
    throw new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err);
  }
};
