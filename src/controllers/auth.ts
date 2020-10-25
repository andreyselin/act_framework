import {app} from "../app";
import {IException} from "../models/ExceptionModel";
import {Express} from "../modules/Common/Express";

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
  return {
    status: 0,
    data: null
  }
};
