/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores contact type';

export const definitions = {
  contactType: { type: String, required: true },
  contactTypeDiv: { type: String, required: true },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
  },
};

const contactTypeSchema: Schema = new Schema(definitions);

export const ContactType = mongooseModel('ContactType', contactTypeSchema);
