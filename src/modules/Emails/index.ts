import {mExceptions} from "../Exceptions";


export namespace Emails {
  export class Module<_IException, _IExceptionsModule> {
    async send(params) {
      console.log('sending the shit');
      if(1==1){
        return mExceptions.cast('general', 'tmp', {});
      }
      return true;
    }
  }
}

export const mEmails = new Emails.Module();
