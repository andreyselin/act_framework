import {Mongo} from "../modules/Common/Mongo";
import {env} from "../env";
import {IException, initExceptionsModule} from "../models/ExceptionModel";
import {initUsersModule, IUser} from "../models/UserModel";
import {runExpress} from "../servers/express";
import {Auth} from "../modules/Auth";
import {Emails} from "../modules/Emails";

    // Declare modules
    // Hope they dont require mongo client started before
    // setting up mongo entities

const exceptions = initExceptionsModule();
const emails = new Emails.Module<IException>({ exceptions });
const users = initUsersModule(exceptions);
const auth = new Auth.Module<IUser, IException>({ exceptions, users, emails });

export const app = {
  exceptions,
  emails,
  users,
  auth
};

    // Async stuff required
    // to start app and
    // only then operate

export async function startApp() {
  const mongoClient = new Mongo.Client({
    url: env.db.url
  });
  await mongoClient.listen();

  // Only now, after mongo started, start express
  runExpress();
}
