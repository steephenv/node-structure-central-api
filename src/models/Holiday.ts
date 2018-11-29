/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of holiday info';

export const definitions = {
  occasionDate: { type: Date, unique: true, required: true },
  occasionName: { type: String, required: true },
  occasionNameDiv: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const holidaySchema: Schema = new Schema(definitions);

export const Holiday = mongooseModel('Holiday', holidaySchema);
