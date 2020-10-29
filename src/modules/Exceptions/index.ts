import {mMonitoring} from "../Monitoring";

export namespace Exceptions {


      ////////////////////
      //                //
      //    Defaults    //
      //                //
      ////////////////////


  export interface IException {
    status: number;
    key: string;
    data: any;
  }

  export type TExceptionKey
    = 'general'
    | 'wrongParams'
    | 'notAllowed'
    | 'notFound';

  export const exceptions: IExceptionsList = {
    general:       data => ({ status: 10001,   key: 'general',        data }),
    notAllowed:    data => ({ status: 10002,   key: 'notAllowed',     data }),
    wrongParams:   data => ({ status: 10003,   key: 'wrongParams',    data }),
    notFound:      data => ({ status: 10004,   key: 'notFound',       data }),
  };


  export type IExceptionsList = {
    // Check
    // [key in TExceptionKey]: (data) => IException
    [ key in TExceptionKey ]: (data) => { status: number, key: key, data: any }
  };



        //////////////////
        //              //
        //    Module    //
        //              //
        //////////////////


  export class Module
  // <_TExceptionKey extends TExceptionKey, _IException extends IException>
  {

    exceptions = exceptions;
    monitoring = mMonitoring;

    cast(exceptionKey: TExceptionKey, desc: string, data?: object): IException {
      console.log(`EXC: ${exceptionKey} / ${desc}`, data);
      return this.exceptions[exceptionKey](data);
    }

    // Check if is exact
    is(exceptionKey: TExceptionKey, input): false | IException {
      return input?.status > 10000 ? input : false;
    }

    // Check if is exceptions at all
    isAny(input): false | IException {
      return input?.status > 10000 ? input : false;
    }

        // Use notification service

    monitor(exception: IException) {
      this.monitoring.send(exception)
    }


        // Old, replace it everywhere
        // with exceptions or is / isAny


    catched(desc: string, data, e: Error): IException {
      return this.exceptions.general(data);
    };

    check(input:any): false | IException {
      return input?.status > 10000 ? input : false;
    }

  }
}

export const mExceptions = new Exceptions.Module();
