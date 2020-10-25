import {initExceptionModule} from "../models/ExceptionModel";
import {initUserModule} from "../models/UserModel";

export const app: any = {};

export const initApp = () => {
  app.exceptions = initExceptionModule();
  app.users = initUserModule(app.exceptions);
};

