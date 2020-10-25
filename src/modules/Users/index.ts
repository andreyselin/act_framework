import {Expecteds} from "../Common/Expecteds";
import {Document, model, Model, Schema} from "mongoose";
import shortid from 'shortid';

export namespace Users {

  export interface IModule<_IUser, _IException> {
    exceptionsModule: Expecteds.IExceptionsModule<_IException>;
    create:  (params: { user?: _IUser, config?: any }) => Promise<_IUser | _IException>;
    getById: (_id: string) => Promise<_IUser | _IException>;
  }

  export interface IDefaultUser extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IModuleConfig<_IUser, _IException> {
    schemaConfig: object;
    exceptionsModule: Expecteds.IExceptionsModule<_IException>;
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
    return model<_IUser, IUserModel>('User', UserSchema);
  }

  //////////////////
  //              //
  //    Module    //
  //              //
  //////////////////


  export class Module<_IUser extends IDefaultUser, _IException> implements IModule<_IUser, _IException> {

    User: Model<_IUser>;
    exceptionsModule: Expecteds.IExceptionsModule<_IException>;

    constructor({schemaConfig, exceptionsModule}: IModuleConfig<_IUser, _IException>) {
      this.User = prepareUserInMongo<_IUser>(schemaConfig);
      this.exceptionsModule = exceptionsModule;
    }

    async create(params) {
      try {
        const newUser = new this.User(params.user);
        return await newUser.save();
      } catch (e) {
        return this.exceptionsModule.create();
      }
    }

    async getById(_id: string) {
      const result = await this.User.findById(_id);
      if (!result) {
        return this.exceptionsModule.create()
      }
      return result;
    }

    async updateBy() {

    }

  }

}
