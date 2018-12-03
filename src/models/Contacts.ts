/* tslint:disable:variable-name */
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores contact details';

export const definitions = {
  organization: { type: String, required: true, unique: true },
  organizationDiv: { type: String },
  contact: { type: String, required: true, unique: true },
  contactDiv: { type: String },
  contactType: { type: String },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  departmentSection: {
    type: Schema.Types.ObjectId,
    ref: 'DepartmentSection',
  },
  contactTypeDiv: { type: String },
  email: { type: String, required: true },
  fax: { type: String },
  houseApt: { type: String, required: true },
  street: { type: String },
  city: { type: String },
  postCode: { type: String },
  country: { type: String },
  mobileNumber: { type: String },
  atoll: {
    type: Schema.Types.ObjectId,
    ref: 'Atoll',
  },
  island: {
    type: Schema.Types.ObjectId,
    ref: 'Island',
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
};

const contactSchema: Schema = new Schema(definitions);

export const Contact = mongooseModel('Contact', contactSchema);
