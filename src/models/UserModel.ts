import {Users} from "../modules/Users";
import {IException} from "./ExceptionModel";

export interface IUser extends Users.IDefaultUser {}



export const initUserModule = (exceptionsModule) => {
  const schemaConfig = {
    ...Users.defaultUserSchemaConfig
  };
  return new Users.Module<IUser, IException>({schemaConfig, exceptionsModule});
};
