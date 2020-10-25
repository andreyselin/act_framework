import {Mongo} from "../modules/Common/Mongo";
import {env} from "../env";
import {initExceptionsModule} from "../models/ExceptionModel";
import {initUsersModule} from "../models/UserModel";

    // Declare modules
    // Hope they dont require mongo client started before
    // setting up mongo entities

const exceptions = initExceptionsModule();
const users = initUsersModule(exceptions);

export const app = {
  exceptions,
  users
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


}
