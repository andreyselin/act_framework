import {Commons} from "../Commons";

export namespace Users {

  export interface IModule<_IUser, _IException> {

    exceptionsModule: Commons.IExpectedExceptionsModule<_IException>;

    create:  (params: { user: _IUser, config?: any }) => Promise<_IUser | _IException>;
    // getById: (_id: string) => Promise<_IUser>;
    getById: (_id: string) => Promise<_IUser | _IException>;

  }

  export interface IModuleConfig<_IUser, _IException> {
    schemaConfig: object;
    exceptionsModule: Commons.IExpectedExceptionsModule<_IException>;
  }
}



