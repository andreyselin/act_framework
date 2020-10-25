import {Mongo} from "../modules/Common/Mongo";
import {initApp} from './appModules';
import {env} from "../env";

export async function startApp() {
  const mongoClient = new Mongo.Client({
    url: env.db.url
  });
  await mongoClient.listen();

  initApp();
}
