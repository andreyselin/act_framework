import {IEnv} from "../Env";
import {env} from "../../env";

export namespace Monitoring {

  export class Module {
    api: string;
    constructor({monitoring}: IEnv) {
      this.api = monitoring.api;
    }
    send(data) {
      try {
        console.log('Send critical', data);
        // fetch this.api
      } catch (e) {
        console.log('monitoring error')
      }
    }
  }
}


export const mMonitoring = new Monitoring.Module(env);
