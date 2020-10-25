
// Place this later to CommonsModel and export from there
export namespace Expecteds {

  export interface IExceptionsModule<_IException> {
    check: (input: any) => false | _IException;
    create: (...args: any[]) => _IException;
  }

  export interface IUserModule<_IUser, _IException> {
    create:  (params: { user?: _IUser, config?: any }) => Promise<_IUser | _IException>;
    getById: (_id: string) => Promise<_IUser | _IException>;
  }

  export interface IEmailModule<_IException> {
    send: (params: any) => Promise<true | _IException>;
  }

}
