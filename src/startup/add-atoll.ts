import { Atoll } from '../models/Atolls';
import { Promise as BluePromise } from 'bluebird';
import { atolls } from './atoll';

export const initAtolls = async () => {
  await BluePromise.map(atolls, atoll => {
    const newAt = new Atoll(atoll);
    return newAt.save();
  });
};
