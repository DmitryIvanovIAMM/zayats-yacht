'use server';

import { User, userFields, UserFrontend, UserModel } from '@/models/User';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Messages } from '@/helpers/messages';
import { pick } from 'lodash';

export const LoginOrRegister = async (user: UserFrontend) => {
  // eslint-disable-next-line no-console
  console.log(`LoginOrRegister().  user: ${user}`);

  const mayBeUser: User | null = await findUserByEmail(user.email);
  if (mayBeUser) {
    const isPasswordMatching = await bcrypt.compare(user.password, mayBeUser.hashedPassword || '');
    if (!isPasswordMatching) {
      return { isSuccessful: false, message: Messages.InvalidCredentials, user: null };
    }

    return {
      isSuccessful: true,
      message: 'User found',
      user: JSON.parse(JSON.stringify(pick(mayBeUser, userFields)))
    };
  }

  const salt = 10;
  const newUser = {
    _id: new Types.ObjectId(),
    name: user.name || user.email,
    email: user.email,
    role: 'user',
    hashedPassword: await bcrypt.hash(user.password, salt),
    salt: salt
  };
  await UserModel.create(newUser, { new: true });
  return { isSuccessful: true, message: Messages.NewUserCreated, user: newUser };
};

const findUserByEmail = async (email: string) => {
  const mayBeUser = await UserModel.findOne({
    email: email
  }).lean();
  if (mayBeUser) return mayBeUser;
  return null;
};
