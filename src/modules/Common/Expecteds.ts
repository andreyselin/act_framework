
// Place this later to CommonsModel and export from there
export namespace Expecteds {

  export interface IExceptionsModule<_IException> {
    check: (input: any) => false | _IException;
    create: (...args: any[]) => _IException;
  }

}
