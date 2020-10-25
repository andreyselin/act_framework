import {Exceptions} from "../modules/Exceptions";

export interface IException extends Exceptions.IDefaultException {}

export const initExceptionsModule = () => {
  const defaultException: IException = {
    status: 10001,
    data: null,
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
