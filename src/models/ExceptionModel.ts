import {Exceptions} from "../modules/Exceptions";

// Should not be exported, everything through modules only
interface IException extends Exceptions.Default.IException {}

type TExceptionKey = Exceptions.Default.TExceptionKey; // | 'blalba' | '...'

const exceptions: Exceptions.IExceptionsList<TExceptionKey, IException> = {
  ... Exceptions.Default.exceptions
};

export const initExceptionsModule = (monitoring) => {
  return new Exceptions.Module({ exceptions, monitoring });
};
