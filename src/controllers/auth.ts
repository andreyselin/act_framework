import {TExternalController} from "../models/AppModel";
import {app} from "../app";
import {IException} from "../models/ExceptionModel";

export const requestSignInController: TExternalController = async (params) => {
  const { authType, authId } = params;

  const sendCodeResult = await app.auth.requestSignIn({ authType, authId });
  if (app.exceptions.check(sendCodeResult)) {
    return sendCodeResult as IException;
  }

  return {
    status: 0,
    data: sendCodeResult
  };
};

export const submitAuthController: TExternalController = async (params) => {
  return {
    status: 0,
    data: null
  }
};
