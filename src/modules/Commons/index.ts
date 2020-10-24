
// Place this later to CommonsModel and export from there
export namespace Commons {

  export interface IExpectedExceptionsModule<_IException> {
    check: (input: any) => true;
    create: (...args: any[]) => _IException;
  }

}
