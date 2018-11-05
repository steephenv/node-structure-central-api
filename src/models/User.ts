/* tslint:disable:variable-name */

import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of user info';

export const definitions = {
  firstNameEng: String,
  middleNameEng: String,
  lastNameEng: String,
  commonNameEng: String,
  genderEng: String,
  nationalIdEng: String,
  mobileEng: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  educationEng: String,
  profilePic: String,
  houseAptEng: String,
  streetEng: String,
  atollEng: String,
  islandEng: String,
  cityEng: String,
  postCodeEng: String,
  countryEng: String,
  employeeIdEng: String,
  joinDateEng: Date,
  presentPostTitleEng: String,
  sectionEng: String,
  divisionEng: String,
  unitEng: String,
  statusEng: String,

  firstNameDiv: String,
  middleNameDiv: String,
  lastNameDiv: String,
  commonNameDiv: String,
  genderDiv: String,
  nationalIdDiv: String,
  mobileDiv: String,
  emailDiv: {
    type: String,
    unique: true,
    required: true,
  },
  educationDiv: String,
  houseAptDiv: String,
  streetDiv: String,
  atollDiv: String,
  islandDiv: String,
  cityDiv: String,
  postCodeDiv: String,
  countryDiv: String,
  employeeIdDiv: String,
  joinDateDiv: Date,
  presentPostTitleDiv: String,
  sectionDiv: String,
  divisionDiv: String,
  unitDiv: String,
  statusDiv: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const userSchema: Schema = new Schema(definitions);

export const User = mongooseModel('User', userSchema);
