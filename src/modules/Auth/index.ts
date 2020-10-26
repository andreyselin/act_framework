import {
  AuthMethod
} from "./mongo";
import * as crypto from "crypto";
import {Document} from 'mongoose';
import {Expecteds} from "../Common/Expecteds";


export namespace Auth {
  interface IConfig<_IUser, _IException> {
    users:      Expecteds.IUserModule<_IUser, _IException>;
    emails:     Expecteds.IEmailModule<_IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;
  }

  export type TAuthType =
  // 'telegram' |
    'email';

  export const authTypes: {
    [ key in TAuthType ]: key
  } = {
    // telegram: "telegram",
    email: "email"
  };

  export type TAuthPair = { authType: TAuthType, authId: string };


  export type TAuthPairWithCode = TAuthPair & {
    code: string
  }



    //////////////////
    //              //
    //    Module    //
    //              //
    //////////////////



  export class Module<_IUser extends Document, _IException> {
    users: Expecteds.IUserModule<_IUser, _IException>;
    emails: Expecteds.IEmailModule<_IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;
    // logger: any;

    constructor({users, emails, exceptions}: IConfig<_IUser, _IException>) {
      this.users = users;
      this.emails = emails;
      this.exceptions = exceptions;
      // this.logger = logger || {};
    }



    async requestSignIn ({ authType, authId }: TAuthPair): Promise<TAuthPair | _IException> {

      const code = await this.createAuthCode(authType, authId);
      if (this.exceptions.check(code)) {
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
        // Probably better to move this to sendCodeMethod?
        if (!this.validateAuthData(authType, authId)) {
          return this.exceptions.create('qerbrt', { authType, authId });
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
        console.log('createAuthCode error details:\n ', e, '\n');
        return this.exceptions.create('createAuthCode ertg', { authType, authId });
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

      console.log('validateAuthData result: ', result ? 'true' : 'false');

      return result;
    };





    async getUserByAuthCode ({ authType, authId, code }: TAuthPairWithCode): Promise<_IUser | _IException> {
      try {
        if (! authTypes[ authType ] || ! code) {
          return this.exceptions.create('getUserByAuthCode wrong params', { authType, authId, code });
        }

        // Try to find code
        const authMethod = await AuthMethod.findOneAndUpdate(
          { authType, authId, code },
          { code: null });

        if (!authMethod) {
          return this.exceptions.create('getUserByAuthCode authMethod not found', { authType, authId, code });
        }

        if (authMethod.userId === null) {
          // If user is not assigned (first login)
          // Create user and get his _id to save in session below

          const createdUser = await this.users.create({});
          if (this.exceptions.check(createdUser)) {
            return createdUser;
          }
          await AuthMethod.findOneAndUpdate(
            { _id: authMethod._id },
            { userId: (<_IUser>createdUser)._id });
          return <_IUser>createdUser;
        }

        // Find the user at least to make sure it exists

        const existingUser = await this.users.getById(authMethod.userId);
        if (this.exceptions.check(existingUser)) {
          return existingUser; // As error, just to keep structure
        }
        return existingUser;

      } catch (e) {
        return this.exceptions.create('-getUserByAuthCode-1-32-', { authType, authId, code });
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




  } // Module class





}


