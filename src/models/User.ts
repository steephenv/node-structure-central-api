/* tslint:disable:variable-name */
import * as bcrypt from 'bcrypt';
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of user info';

export const definitions = {
  firstNameEng: { type: String },
  middleNameEng: { type: String },
  lastNameEng: { type: String },
  commonNameEng: { type: String },
  gender: { type: String },
  nationalIdEng: { type: String },
  mobileEng: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  educationEng: { type: String },
  profilePic: { type: String },
  houseAptEng: { type: String },
  streetEng: { type: String },
  atollEng: { type: String },
  islandEng: { type: String },
  cityEng: { type: String },
  postCodeEng: { type: String },
  countryEng: { type: String },
  employeeIdEng: { type: String },
  joinDateEng: Date,
  presentPostTitleEng: { type: String },
  sectionEng: { type: String },
  divisionEng: { type: String },
  unitEng: { type: String },
  statusEng: { type: String },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
    comment: 'has the from `objectId[]`. objectId taken from `Role` collection',
  },
  password: {
    type: String,
  },

  firstNameDiv: { type: String },
  middleNameDiv: { type: String },
  lastNameDiv: { type: String },
  commonNameDiv: { type: String },
  nationalIdDiv: { type: String },
  mobileDiv: { type: String },
  emailDiv: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  educationDiv: { type: String },
  houseAptDiv: { type: String },
  streetDiv: { type: String },
  atollDiv: { type: String },
  islandDiv: { type: String },
  cityDiv: { type: String },
  postCodeDiv: { type: String },
  countryDiv: { type: String },
  employeeIdDiv: { type: String },
  joinDateDiv: { type: Date },
  presentPostTitleDiv: { type: String },
  sectionDiv: { type: String },
  divisionDiv: { type: String },
  unitDiv: { type: String },
  statusDiv: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
};

const userSchema: Schema = new Schema(definitions);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user: any = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongooseModel('User', userSchema);
