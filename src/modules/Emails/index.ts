import {Expecteds} from "../Common/Expecteds";

export namespace Emails {
  export class Module<_IException> {

    exceptions: Expecteds.IExceptionsModule<_IException>;

    constructor({exceptions}) {
      this.exceptions = exceptions;
    }

    async send(params) {
      console.log('sending the shit');
      if(1==1){
        return this.exceptions.create('shit');
      }
      return true;
    }
  }
}
