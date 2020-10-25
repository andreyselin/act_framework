import {requestSignInController, submitAuthController} from "./auth";
import {app} from "../app";
import {pingController} from "./dev";

export const initExpressControllers = () => {
  app.express.addExternalController('get',  '/dev/ping', pingController);
  // app.express.addExternalController('post', '/sign-in/request', requestSignInController);
  // submitAuthController
};
