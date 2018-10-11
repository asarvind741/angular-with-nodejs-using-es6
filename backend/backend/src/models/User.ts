import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";


export type UserModel = mongoose.Document & {
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  emailVerification: boolean;
  comparePassword: comparePasswordFunction;
};

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password:  {type: String},
  email: { type: String, unique: true },
  emailVerification: {type: Boolean}
});
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};
const User = mongoose.model("User", userSchema);
export default User;
