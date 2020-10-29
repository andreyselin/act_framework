import {requestSignInController, submitAuthController} from "./auth";
import {pingController} from "./dev";
import {getConnectionInfoController} from "./connection";
import {mExpress} from "../modules/Common/Express";

export const initExpressControllers = () => {

  // Auth
  mExpress.addExternalController('post',  '/sign-in/request', requestSignInController);
  mExpress.addExternalController('post',  '/sign-in/submit',  submitAuthController);

  // Dev
  mExpress.addExternalController('post',  '/dev/ping',        pingController);

  // Server
  mExpress.addInternalController('get',  '/connection/getInfo',  getConnectionInfoController);

};
