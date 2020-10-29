import {Users} from "../modules/Users";

export interface IUser extends Users.IDefaultUser {}

const schemaConfig = {
  ...Users.defaultUserSchemaConfig
};

export const mUsers = new Users.Module<IUser>({schemaConfig});
