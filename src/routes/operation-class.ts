/* tslint:disable:no-console */
import { RequestHandler } from 'express';
import {
    RequestError,
    RequestErrorType,
  } from '../error-handler/RequestError';

import { Promise as BluePromise } from 'bluebird';

export const create:RequestHandler = async (req, res, next) =>{
    try {
        const resp = await BluePromise.map(req.body, async item => {
          // attach userId if not present
          if (!item.userId) {
            item.userId = res.locals.user ? res.locals.user.userId : null;
          }
  
          const { _options } = item;
          delete item._options;
  
          if (
            _options &&
            _options.skipIfExistingOnCondition &&
            Object.keys(_options.skipIfExistingOnCondition).length
          ) {
            const isExisting = await this.collection
              .count(_options.skipIfExistingOnCondition)
              .exec();
            if (isExisting) {
              const isExistingResp = Object.assign(
                {
                  _IS_EXISTING: true,
                  _DESCRIPTION:
                    'create skipped due to _options.skipIfExistingOnCondition',
                },
                item,
              );
              return isExistingResp;
            }
          }
          const createResp = await this.collection.create(item);
          return createResp;
        });
        return resp;
      } catch (err) {
        return next(
            new RequestError(RequestErrorType.BAD_REQUEST,),
          );
      }
}


export const mainOperations : RequestHandler =  async (req, res, next) => {
  if(req.body.collection === 'User' && req.body.operation === 'save'){
    create(req, res, next)
  }
}
