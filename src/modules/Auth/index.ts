import {
  AuthMethod
} from "./mongo";
import * as crypto from "crypto";
import {Exceptions, mExceptions} from "../Exceptions";
import {mEmails} from "../Emails";
import {IUser, mUsers} from "../Users";


export namespace Auth {

  // interface IConfig<> {
    // exceptions: Exceptions.Module;
  // }

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

  export type TAuthPairWithCode = TAuthPair & { code: string };



    //////////////////
    //              //
    //    Module    //
    //              //
    //////////////////



  export class Module {

    async requestSignIn ({ authType, authId }: TAuthPair): Promise<TAuthPair | Exceptions.IException> {
      const code = await this.createAuthCode(authType, authId);
      if (mExceptions.check(code)) {
        return code as Exceptions.IException;
      }

      if (authType === authTypes.email) {

        // Uncomment this when GSuite is ready
        // And attach sending emails:

        // Use mEmails here

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







    // This is vulnerable place,
    // since it return auth data.
    // Always check how it used.
    async createAuthCode(authType: TAuthType, authId: string): Promise<string | Exceptions.IException> {
      try {
        // Validate authType first and that authId is of proper format
        // Probably better to move this to sendCodeMethod?
        if (!this.validateAuthData(authType, authId)) {
          return mExceptions.cast('wrongParams', 'createAuthCode-1', { authType, authId });
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
        return mExceptions.catched('createAuthCode ertg', { authType, authId }, e);
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





    async getUserByAuthCode({ authType, authId, code }: TAuthPairWithCode): Promise< IUser | Exceptions.IException> {
      try {
        if (! authTypes[ authType ] || ! code) {
          return mExceptions.cast('wrongParams', 'getUserByAuthCode-1', { authType, authId, code });
        }

        // Try to find code
        const authMethod = await AuthMethod.findOneAndUpdate(
          { authType, authId, code },
          { code: null });

        if (!authMethod) {
          return mExceptions.cast('notFound', 'getUserByAuthCode-2', { authType, authId, code });
        }

        if (authMethod.userId === null) {
          // If user is not assigned (first login)
          // Create user and get his _id to save in session below

          const createdUser = await mUsers.create({});
          if (mExceptions.isAny(createdUser)) {
            return createdUser;
          }
          await AuthMethod.findOneAndUpdate(
            { _id: authMethod._id },
            { userId: (<IUser>createdUser)._id });
          return <IUser>createdUser;
        }

        // Find the user at least
        // to make sure it exists
        const existingUser = await mUsers.getById(authMethod.userId);
        if (mExceptions.check(existingUser)) {
          // As error, just to keep structure
          return existingUser as Exceptions.IException;
        }

        return existingUser as IUser;

      } catch (e) {
        return mExceptions.catched('-getUserByAuthCode-1-32-', { authType, authId, code }, e);
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


export const mAuth = new Auth.Module();
