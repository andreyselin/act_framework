export namespace Exceptions {
  export interface IConfig<_IException> {
    defaultException: _IException;
    create: (...args) => _IException;
    check: (input: any) => false | _IException;
  }

  export interface IModule<_IException> {
    defaultException: _IException;
    create: (...args) => _IException
    check: (input: any) => false | _IException
  }

  export interface IDefaultException {
    status: number;
    data: any;
    message?: string;
  }


  export class Module<_IException> implements IModule<_IException> {

    constructor({create, check, defaultException}: IConfig<_IException>) {
      this.create = create;
      this.check = check;
      this.defaultException = defaultException;
    }

    defaultException: _IException;

    create(id: string, data):_IException {
      // const result: IException = {
      //   status: 10001,
      //   message: `Auth exception: ${ id }`,
      //   data
      // };
      return this.defaultException;
    };

    check(input:any): false | _IException {
      return false;
    }

  }
}
