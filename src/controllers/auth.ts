import {app} from "../app";
import {Express} from "../modules/Common/Express";
import {Auth, mAuth} from "../modules/Auth";
import {IUser} from "../modules/Users";
import {Exceptions, mExceptions} from "../modules/Exceptions";
import {mSessions} from "../modules/Sessions";

export const requestSignInController: Express.TExternalController = async (params) => {
  const { authType, authId } = params;

  const sendCodeResult = await mAuth.requestSignIn({ authType, authId });
  if (mExceptions.isAny(sendCodeResult)) {
    throw sendCodeResult as Exceptions.IException;
  }

  return {
    status: 0,
    data: sendCodeResult
  };
};

export const submitAuthController: Express.TExternalController = async (params) => {
  const { authType, authId, code }: Auth.TAuthPairWithCode = params;

  const user = await mAuth.getUserByAuthCode({ authType, authId, code });
  if (mExceptions.isAny(user)) {
    throw user as Exceptions.IException;
  }

  // Create session with user id
  const token = await mSessions.create((user as IUser)._id);
  if (mExceptions.isAny(token)) {
    throw token;
  }

  return {
    status: 0,
    data: { token }
  }
};
