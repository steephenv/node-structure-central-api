// export interface IAtollStruct {
//   commonName: string;
//   officialName: string;
//   islands: string[];
// }

// import { Atoll } from '../models/Atoll';
// import { Island } from '../models/Island';
// import { Promise as BluePromise } from 'bluebird';
// import { atolls } from './atoll';

// export const initAtolls = async () => {
//   await BluePromise.map(atolls, async (atoll: IAtollStruct) => {
//     const newAt = new Atoll({
//       officialName: atoll.officialName,
//       commonName: atoll.commonName,
//       noOfIslands: atoll.islands.length,
//     });
//     const savedAtoll = await newAt.save();
//     await BluePromise.map(atoll.islands, island => {
//       const newIsland = new Island({
//         islandName: island,
//         atollId: savedAtoll._id,
//       });
//       return newIsland.save();
//     });
//   });
// };
