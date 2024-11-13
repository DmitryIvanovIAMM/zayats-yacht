import * as mongoose from 'mongoose';
import timestamps from './plugins/timestamp';
import { Model } from 'mongoose';

import * as crypto from 'crypto';

const Schema = mongoose.Schema;

// Basic interface
interface BaseUserSchema extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  hashedPassword: string;
  salt: string;
}

interface User extends BaseUserSchema {
  authenticate: Function;
  encryptPassword: Function;
  makeSalt: Function;
  safeUser: Function;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: String
});

UserSchema.plugin(timestamps, { index: true });

UserSchema.virtual('password').set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

UserSchema.pre<User>('save', function (next) {
  this.email = this.email.toLowerCase();
  next();
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  encryptPassword: function (password) {
    if (!password || !this.salt) {
      return '';
    }
    const salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64');
  },

  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  safeUser: function () {
    const safeUser = this.toJSON();
    delete safeUser.hashedPassword;
    delete safeUser.salt;
    return safeUser;
  }
};

export { User };
export default mongoose.model<User, Model<User>>('users', UserSchema);
