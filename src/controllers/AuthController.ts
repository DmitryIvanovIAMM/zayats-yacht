'use server';

import { User, userFrontendFields, UserFrontend, UserModel } from '@/models/User';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Messages } from '@/helpers/messages';
import { pick } from 'lodash';

export const LoginOrRegister = async (user: UserFrontend) => {
  // eslint-disable-next-line no-console
  console.log(`LoginOrRegister().  user: ${user}`);

  const mayBeUser = await findUserByEmail(user.email.toLowerCase());
  if (mayBeUser) {
    const isPasswordMatching = await bcrypt.compare(user.password, mayBeUser.hashedPassword || '');
    if (!isPasswordMatching) {
      return { isSuccessful: false, message: Messages.InvalidCredentials, user: null };
    }

    return {
      isSuccessful: true,
      message: 'User found',
      user: JSON.parse(JSON.stringify(pick(mayBeUser, userFrontendFields)))
    };
  }
  const salt = 10;
  const newUser: User = {
    _id: new Types.ObjectId(),
    name: user.name || user.email,
    email: user.email.toLowerCase(),
    role: 'user',
    hashedPassword: await bcrypt.hash(user.password, salt),
    salt: salt,
    isActive: true,
    emailValidated: false
  };
  const createdUser = await UserModel.create(new UserModel(newUser));
  return {
    isSuccessful: true,
    message: Messages.NewUserCreated,
    user: JSON.parse(JSON.stringify(pick(createdUser, userFrontendFields)))
  };
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  const mayBeUser = await UserModel.findOne({
    email: email
  });
  if (mayBeUser) return mayBeUser.toObject();
  return null;
};
