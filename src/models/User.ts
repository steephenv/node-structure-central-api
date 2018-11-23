/* tslint:disable:variable-name */
import * as bcrypt from 'bcrypt';
import { model as mongooseModel, Schema } from 'mongoose';

export const description = 'Stores details of user info';

export const definitions = {
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  commonName: { type: String },
  gender: { type: String },
  nationalId: { type: String },
  mobile: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  education: { type: String },
  profilePic: { type: String },
  houseApt: { type: String },
  street: { type: String },
  atoll: {
    type: Schema.Types.ObjectId,
    ref: 'Atoll',
    comment:
      'has the from `objectId[]`. objectId taken from `Atoll` collection',
  },
  island: {
    type: Schema.Types.ObjectId,
    ref: 'Island',
    comment:
      'has the from `objectId[]`. objectId taken from `Island` collection',
  },
  city: { type: String },
  postCode: { type: String },
  country: { type: String },
  employeeId: { type: String },
  joinDate: Date,
  presentPostTitle: { type: String },
  section: {
    type: Schema.Types.ObjectId,
    ref: 'DepartmentSection',
    comment:
      'has the from `objectId[]`. objectId taken from `DepartmentSection` collection',
  },
  division: { type: String },
  unit: { type: String },
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
  status: { type: String },
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
  cityDiv: { type: String },
  postCodeDiv: { type: String },
  countryDiv: { type: String },
  employeeIdDiv: { type: String },
  joinDateDiv: { type: Date },
  presentPostTitleDiv: { type: String },
  divisionDiv: { type: String },
  unitDiv: { type: String },
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
