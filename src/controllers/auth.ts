import {app} from "../app";
import {IException} from "../models/ExceptionModel";
import {Express} from "../modules/Common/Express";
import {Auth} from "../modules/Auth";
import {IUser} from "../models/UserModel";

export const requestSignInController: Express.TExternalController = async (params) => {
  const { authType, authId } = params;

  const sendCodeResult = await app.auth.requestSignIn({ authType, authId });
  if (app.exceptions.check(sendCodeResult)) {
    throw sendCodeResult as IException;
  }

  return {
    status: 0,
    data: sendCodeResult
  };
};

export const submitAuthController: Express.TExternalController = async (params) => {
  const { authType, authId, code }: Auth.TAuthPairWithCode = params;

  const user = await app.auth.getUserByAuthCode({ authType, authId, code });
  if (app.exceptions.check(user)) {
    throw user as IException;
  }

  // Create session with user id
  const token = await app.sessions.create((user as IUser)._id);
  if (app.exceptions.check(token)) {
    throw token;
  }

  return {
    status: 0,
    data: { token }
  }
};
