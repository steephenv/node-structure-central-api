import { RequestHandler } from 'express';

import { islands } from '../config/app/islands';

export const getIslands: RequestHandler = (req, res, next) => {
  return res.status(200).send({
    success: true,
    data: islands,
  });
};
