import {Users} from "../modules/Users";
import {IException} from "./ExceptionModel";

export interface IUser extends Users.IDefaultUser {}

export const initUsersModule = (exceptionsModule):Users.IModule<IUser, IException> => {
  const schemaConfig = {
    ...Users.defaultUserSchemaConfig
  };
  return new Users.Module<IUser, IException>({schemaConfig, exceptionsModule});
};
