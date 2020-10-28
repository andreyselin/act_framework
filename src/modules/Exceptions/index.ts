import {Expecteds} from "../Common/Expecteds";

export namespace Exceptions {


      ////////////////////
      //                //
      //    Defaults    //
      //                //
      ////////////////////


  export namespace Default {
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

    export const exceptions: IExceptionsList<TExceptionKey, IException> = {
      general:       data => ({ status: 10001,   key: 'general',        data }),
      notAllowed:    data => ({ status: 10002,   key: 'notAllowed',     data }),
      wrongParams:   data => ({ status: 10003,   key: 'wrongParams',    data }),
      notFound:      data => ({ status: 10004,   key: 'notFound',       data }),
    };
  }

  export interface IConfig<_TExceptionKey extends string, _IException, _IMonitoringModule extends Expecteds.IMonitoringModule> {
    exceptions: IExceptionsList<_TExceptionKey, _IException>;
    monitoring: _IMonitoringModule;
  }

  export type IExceptionsList<_TExceptionKey extends string, _IException> = {
    // Check
    [ key in _TExceptionKey ]: (data)=>_IException
    // [ key in _TExceptionKey ]: (data) => { status: number, key: key, data: any }
  }


        //////////////////
        //              //
        //    Module    //
        //              //
        //////////////////


  export class Module<
    _IException,
    _TExceptionKey extends string,
    _IMonitoringModule extends Expecteds.IMonitoringModule
    >
  {
    constructor({monitoring, exceptions}: IConfig<_TExceptionKey, _IException, _IMonitoringModule>) {
      this.exceptions = exceptions;
      this.monitoring = monitoring;
    }

    exceptions: IExceptionsList<_TExceptionKey, _IException>;
    monitoring: _IMonitoringModule;

    cast(exceptionKey: _TExceptionKey, desc: string, data?: object): _IException {
      console.log(`EXC: ${exceptionKey} / ${desc}`, data);
      return this.exceptions[exceptionKey](data);
    }

    // Check if is exact
    is(exceptionKey: _TExceptionKey, input): false | _IException {
      return input?.status > 10000 ? input : false;
    }

    // Check if is exceptions at all
    isAny(input): false | _IException {
      return input?.status > 10000 ? input : false;
    }

        // Use notification service

    monitor(exception: _IException) {
      this.monitoring.send(exception)
    }


        // Old, replace it everywhere
        // with exceptions or is / isAny


    create(exceptionKey: _TExceptionKey, data, e: Error): _IException {
      return this.exceptions[exceptionKey](data);
    };

    check(input:any): false | _IException {
      return input?.status > 10000 ? input : false;
    }

  }
}
