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
   required: true
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

 firstNameXXX: String,
 middleNameXXX: String,
 lastNameXXX: String,
 commonNameXXX: String,
 genderXXX: String,
 nationalIdXXX: String,
 mobileXXX: String,
 emailXXX: {
   type: String,
   unique: true,
   required: true
 },
 educationXXX: String,
 houseAptXXX: String,
 streetXXX: String,
 atollXXX: String,
 islandXXX: String,
 cityXXX: String,
 postCodeXXX: String,
 countryXXX: String,
 employeeIdXXX: String,
 joinDateXXX: Date,
 presentPostTitleXXX: String,
 sectionXXX: String,
 divisionXXX: String,
 unitXXX: String,
 statusXXX: String,
 createdAt: Date,
 updatedAt: Date,
 createdBy:{
  type: Schema.Types.ObjectId,
  ref: 'User',
 }
};

const userSchema: Schema = new Schema(definitions);


export const User = mongooseModel('User', userSchema);
