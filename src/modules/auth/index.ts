/*
import {
  AuthMethod,
  IAuthConfig,
  IAuthEmailModuleExpected,
  IAuthUserModuleExpected,
  TAuthPair, TAuthPairWithCode,
  TAuthType
} from "./AuthModel";
import {authTypes} from "./const";
import * as crypto from "crypto";
import {Document} from 'mongoose';
import {Exceptions} from "../Exceptions/ExceptionModel";


class AuthModule<_IUser extends Document, _IException> {
  userModule: IAuthUserModuleExpected<_IUser, _IException>;
  emailModule: IAuthEmailModuleExpected;
  exceptionModule: Exceptions.IModule<_IException>;
  logger: any;

  constructor({userModule, emailModule, exceptionModule, logger}: IAuthConfig<_IUser, _IException>) {
    this.userModule = userModule;
    this.emailModule = userModule;
    this.exceptionModule = exceptionModule;
    this.logger = logger || {};
  }



  async requestSignIn ({ authType, authId }: TAuthPair): Promise<TAuthPair | _IException> {

    const code = await this.createAuthCode(authType, authId);
    if (this.exceptionModule.isException(code)) {
      return <_IException>code;
    }

    if (authType === authTypes.email) {

      // Uncomment this when GSuite is ready
      // And attach sending emails:

      // const sendingResult = await sendMail(
      //   authId,
      //   `Your code for ${ environment.mainBotKey }`,
      //   `Use this code at to sign in at ${ environment.mainBotKey }: ${ code }`
      //   // Do not send link yet, lets make it a bit easier and faster for now
      // );
      // if (isExceptionSmart(sendingResult)) {
      //   return sendingResult;
      // }
    }

    return { authType, authId };
  };







  // This is vulnerable place, since it return auth data.
  // Always check how it used.
  async createAuthCode(authType: TAuthType, authId: string): Promise<string | _IException> {
    try {

      // Validate authType first and that authId is of proper format
      if (!this.validateAuthData(authType, authId)) {
        return this.exceptionModule.throwException('qerbrt', { authType, authId });
      }

      const code = crypto.randomBytes(8).toString('hex').substr(0, 5);

      // Paste hardcode code here for apple

      let authMethod = await AuthMethod.findOneAndUpdate(
        { authType, authId },
        { $set: { code } });

      // Create new one if nothing is found
      if (authMethod === null) {
        authMethod = new AuthMethod({ authType, authId, code, userId: null });
        await authMethod.save();
      }

      return code;

    } catch (e) {
      this.logger.info('createAuthCode error details:\n ', e, '\n');
      return this.exceptionModule.throwException('createAuthCode ertg', { authType, authId });
    }
  };






  validateAuthData(authType: TAuthType, authId: string): boolean {
    let result = false;
    if (authType === authTypes.email && this.validateEmail(authId)) {
      result = true;
    }

    // Uncomment when telegram is back:
    // else if (authType === authTypes.telegram && !Number.isNaN(Number(authId))) {
    //   result = true;
    // }

    this.logger.info('validateAuthData result: ', result ? 'true' : 'false');

    return result;
  };





  async getUserByAuthCode ({ authType, authId, code }: TAuthPairWithCode): Promise<_IUser | _IException> {
    try {
      if (! authTypes[ authType ] || ! code) {
        return this.exceptionModule.throwException('getUserByAuthCode wrong params', { authType, authId, code });
      }

      // Try to find code
      const authMethod = await AuthMethod.findOneAndUpdate(
        { authType, authId, code },
        { code: null });

      if (!authMethod) {
        return this.exceptionModule.throwException('getUserByAuthCode authMethod not found', { authType, authId, code });
      }

      if (authMethod.userId === null) {
        // If user is not assigned (first login)
        // Create user and get his _id to save in session below

        const createdUser = await this.userModule.createUser({ user: {}});
        if (this.exceptionModule.isException(createdUser)) {
          return createdUser;
        }
        await AuthMethod.findOneAndUpdate(
          { _id: authMethod._id },
          { userId: (<_IUser>createdUser)._id });
        return <_IUser>createdUser;
      }

      // Find the user at least to make sure it exists

      const existingUser = await this.userModule.getById(authMethod.userId);
      if (this.exceptionModule.isException(existingUser)) {
        return existingUser; // As error, just to keep structure
      }
      return existingUser;

    } catch (e) {
      return this.exceptionModule.throwException('-getUserByAuthCode-1-32-', { authType, authId, code });
    }

  };





  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  validateEmail(email: string): boolean {
    try {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    } catch (e) {
      return false;
    }
  }




}
*/
