import {Mongo} from "../modules/Common/Mongo";
import {env} from "../env";
import {IException, initExceptionsModule} from "../models/ExceptionModel";
import {initUsersModule, IUser} from "../models/UserModel";
import {Auth} from "../modules/Auth";
import {Emails} from "../modules/Emails";
import {Express} from "../modules/Common/Express";
import {initExpressControllers} from "../controllers";
import {Sessions} from "../modules/Sessions";

    // Declare modules
    // Hope they dont require mongo client started before
    // setting up mongo entities

const exceptions = initExceptionsModule();
const emails = new Emails.Module<IException>({ exceptions });
const users = initUsersModule(exceptions);
const auth = new Auth.Module<IUser, IException>({ exceptions, users, emails });
const sessions = new Sessions.Module<IUser, IException>({users, exceptions});
const mongo = new Mongo.Client({ url: env.db.url });
const express = new Express.Module<IUser, IException>({ port: env.express.port, sessions, exceptions });

export const app = {
  exceptions,
  emails,
  users,
  auth,
  sessions,
  mongo,
  express
};

    // Async stuff required
    // to start app and
    // only then operate

export async function startApp() {
  await app.mongo.listen();
  // Only now, after mongo started, start express
  initExpressControllers();
  app.express.listen();
}
