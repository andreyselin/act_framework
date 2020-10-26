
// Place this later to CommonsModel and export from there
export namespace Expecteds {

  export interface IExceptionsModule<_IException> {
    defaultException: _IException;
    check: (input: any) => false | _IException;

    // Expect optional error | null argument
    create: (...args: any[]) => _IException;
  }

  export interface IUserModule<_IUser, _IException> {
    create:  (params: { user?: _IUser, config?: any }) => Promise<_IUser | _IException>;
    getById: (_id: string) => Promise<_IUser | _IException>;
  }

  export interface IEmailModule<_IException> {
    send: (params: any) => Promise<true | _IException>;
  }

  export interface ISessionsModule<_IUser, _IException> {
    getUserIfTokenIsActive: (token: string | null) => Promise<_IUser | _IException>;
    create: (userId: string) => Promise<string | _IException>;
  }

  export interface ISubscriptionsModule<_IException> {
  }

}
