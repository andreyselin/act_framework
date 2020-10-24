import {Document, Model, model, Schema} from "mongoose";
import shortid from 'shortid';

export interface IDefaultUser extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const defaultUserSchemaConfig = {
  _id: {
    'type': String,
    'default': shortid.generate
  },
  createdAt: Date,
  updatedAt: Date,
};

export function prepareUserInMongo<_IUser extends IDefaultUser>(schemaConfig: any): Model<_IUser> {
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
};
