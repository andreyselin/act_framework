import * as crypto from "crypto";
import {Expecteds} from "../Common/Expecteds";
import {Document, model, Model, Schema} from "mongoose";

export namespace Sessions {

  interface IConfig<_IUser, _IException> {
    users: Expecteds.IUserModule<_IUser, _IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;
  }

  interface IAuthSession extends Document {

    userId: string
    token: string

    // IP + application + token — ?
    createdAt?: Date
    updatedAt?: Date
  }

  const AuthSessionSchema: Schema = new Schema({

    userId: String,
    token: String,
    createdAt: Date,
    updatedAt: Date
  });

  export const AuthSession: Model<IAuthSession> = model<IAuthSession>('authsession', AuthSessionSchema);



  export const sessionConstants = {
    aliveTime: 1000 * 60 * 300
  };



        //////////////////
        //              //
        //    Module    //
        //              //
        //////////////////




  export class Module<_IUser, _IException> {

    users: Expecteds.IUserModule<_IUser, _IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;

    constructor({users, exceptions}: IConfig<_IUser, _IException>) {
      this.users = users;
      this.exceptions = exceptions;
    }

    async create (userId: string): Promise<string | _IException> {
      try {
        const createdAt = new Date();
        const token = crypto.randomBytes(32).toString('hex');
        const session = new AuthSession({
          userId,
          token,
          createdAt,
          updatedAt: createdAt
        });
        await session.save();
        return token;
      } catch (e) {
        return this.exceptions.create('Sessions.module.create.catched', '-SessionService-create-1-rgn-', e);
      }
    }

    // Checking
    async getUserIfTokenIsActive (token: string | null): Promise<_IUser | _IException> {
      if (!token) {
        return this.exceptions.defaultException;
      }
      const updatedAt = {
        // $gt: new Date(new Date().getTime() - 1000 * 60 * 18)
        $gt: new Date(new Date().getTime() - sessionConstants.aliveTime)
      };
      const session = await AuthSession.findOneAndUpdate(
        { token, updatedAt },
        { updatedAt: new Date() });

      if (!session) {
        return this.exceptions.create('Sessions.module.getUser.sessionNotFound', {token});
      }

      const user = await this.users.getById(session.userId);

      return user; // as _IUser and _IException;
    }

  }

}
