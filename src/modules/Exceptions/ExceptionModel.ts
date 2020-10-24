export namespace Exceptions {
  export interface IConfig {}
  export interface IModule<_IException> {
    isException: (input: any) => true;
    throwException: (...args: any[]) => _IException;
  }
}

export interface IException {
  status: number;
  message?: string;
  data?: any;
}
