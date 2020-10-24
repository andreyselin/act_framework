import {Users} from "../modules/Users/";
import {Exceptions} from "../modules/Exceptions";

  // Send these logical parts
  // to appropriate files later

  //////////////////////
  //                  //
  //    Exceptions    //
  //                  //
  //////////////////////

export interface IException extends Exceptions.IDefaultException {}

const defaultException: IException = {
  status: 10001,
  message: `Default exception`
};

export const exceptionsModule = new Exceptions.Module<IException>({
  defaultException,
  create: function (id, data) {
    return defaultException;
  },
  check: function (input) {
    return input === defaultException ? input : false;
  },
});

  /////////////////////
  //                 //
  //    User part    //
  //                 //
  /////////////////////

export interface IUser extends Users.IDefaultUser {}

export const schemaConfig = {
  ...Users.defaultUserSchemaConfig
};

export const userModule = new Users.Module<IUser, IException>({ schemaConfig, exceptionsModule });
