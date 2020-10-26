import {Document, Model, model, Schema} from "mongoose";
import shortid from 'shortid';
import {Users} from "./";
import {preSaveHook} from "../../utilities/mongo";


export const defaultUserSchemaConfig = {
  _id: {
    'type': String,
    'default': shortid.generate
  },
  createdAt: Date,
  updatedAt: Date,
};


export function prepareUserInMongo<_IUser extends Users.IDefaultUser>(schemaConfig: any): Model<_IUser> {
  interface IUserModel extends Model<_IUser> {}
  const UserSchema: Schema = new Schema(schemaConfig);
  UserSchema.pre<_IUser>('save', preSaveHook);
  return model<_IUser, IUserModel>('User', UserSchema);
}
