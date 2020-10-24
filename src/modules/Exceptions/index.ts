// This is common module, other modules expect it to always exist


import {IException} from "./ExceptionModel";

class ExceptionService {

  constructor(){
  }

  drawException(id: string, data): IException {
    const result: IException = {
      status: 10001,
      message: `Auth exception: ${ id }`,
      data
    };
    // this.logger.info(result);
    return result;
  };

  isException(input:any): boolean {
    return input?.status === 10001;
  }

}
