import * as crypto from "crypto";
import {Document, model, Model, Schema} from "mongoose";
import {Exceptions, mExceptions} from "../Exceptions";
import {IUser, mUsers} from "../Users";

export namespace Sessions {

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




  export class Module {

    async create (userId: string): Promise<string | Exceptions.IException> {
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
        return mExceptions.catched('Sessions.module.create.catched', {userId}, e);
      }
    }

    // Checking
    async getUserIfTokenIsActive (token: string | null): Promise<IUser | Exceptions.IException> {
      try {
        if (!token) {
          return mExceptions.cast('wrongParams', 'noTokenProvided');
        }
        const updatedAt = {
          // $gt: new Date(new Date().getTime() - 1000 * 60 * 18)
          $gt: new Date(new Date().getTime() - sessionConstants.aliveTime)
        };
        const session = await AuthSession.findOneAndUpdate(
          { token, updatedAt },
          { updatedAt: new Date() });

        if (!session) {
          return mExceptions.cast('notFound', 'Sessions.module.getUser.session', {token});
        }

        const user = await mUsers.getById(session.userId);

        return user; // as _IUser and _IException;
      } catch (e) {
        return mExceptions.catched('Sessions.module.getUserIfTokenIsActive', {token}, e);
      }
    }
  }

}

export const mSessions = new Sessions.Module();
