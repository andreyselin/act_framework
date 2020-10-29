import {Document, model, Model, Schema} from "mongoose";
import shortid from 'shortid';
import {Exceptions, mExceptions} from "../Exceptions";
import {IExtendedUser, schemaConfig} from "./extension";

export namespace Users {

  // Keep user module its prototype
  // since user is quite different
  // in different projects

  export interface IDefaultUser extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IModuleConfig<_IUser> {
    schemaConfig: object;
  }

  export const defaultUserSchemaConfig = {
    _id: {
      'type': String,
      'default': shortid.generate
    },
    createdAt: Date,
    updatedAt: Date,
  };

  function prepareUserInMongo<_IUser extends Users.IDefaultUser>(schemaConfig: any): Model<_IUser> {
    interface IUserModel extends Model<_IUser> {}
    const UserSchema: Schema = new Schema(schemaConfig);
    UserSchema.pre<_IUser>('save', function(next) {
      const now = new Date();
      if (!this.createdAt) {
        this.createdAt = now;
      }
      this.updatedAt = now;
      next();
    });
    return model<_IUser, IUserModel>('user', UserSchema);
  }

      //////////////////
      //              //
      //    Module    //
      //              //
      //////////////////


  // Will require user to explicitly passed here,
  // since we dont know what is his properties

  export class Module<_IUser extends IDefaultUser> {

    User: Model<_IUser>;

    constructor({schemaConfig}: IModuleConfig<_IUser>) {
      this.User = prepareUserInMongo<_IUser>(schemaConfig);
    }

    async create(params) {
      try {
        const newUser = new this.User(params.user);
        return await newUser.save();
      } catch (e) {
        return mExceptions.catched('user.create', params, e);
      }
    }

    async getById(_id: string): Promise<_IUser | Exceptions.IException> {
      try {
        return await this.User.findById(_id) || mExceptions.cast('notFound', 'Users.getById-1');
      } catch (e) {
        return mExceptions.catched('Users.getById-2', {_id}, e);
      }
    }

    async updateBy() {
    }

  }
}

// If types circ dep error occurs,
// make this (and extension.ts) part index.ts, and move other stuff to ./default.ts
export interface IUser extends IExtendedUser {}

export const mUsers = new Users.Module<IUser>({schemaConfig});
