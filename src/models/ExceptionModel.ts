import {Exceptions} from "../modules/Exceptions";

export interface IException extends Exceptions.IDefaultException {}

export const initExceptionModule = () => {
  const defaultException: IException = {
    status: 10001,
    message: `Default exception`
  };
  return new Exceptions.Module<IException>({
    defaultException,
    create: function (id, data) {
      return defaultException;
    },
    check: function (input) {
      return input === defaultException ? input : false;
    },
  });
};
