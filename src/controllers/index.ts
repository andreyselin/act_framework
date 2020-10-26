import {requestSignInController, submitAuthController} from "./auth";
import {app} from "../app";
import {pingController} from "./dev";
import {getConnectionInfoController} from "./connection";

export const initExpressControllers = () => {

  // Auth
  app.express.addExternalController('post',  '/sign-in/request', requestSignInController);
  app.express.addExternalController('post',  '/sign-in/submit',  submitAuthController);

  // Dev
  app.express.addExternalController('post',  '/dev/ping',        pingController);

  // Server
  app.express.addInternalController('get',  '/connection/getInfo',  getConnectionInfoController);

};
