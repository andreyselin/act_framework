import {Mongo} from "../modules/Common/Mongo";
import {env} from "../env";
import {initExpressControllers} from "../controllers";
import {Servers} from "../modules/FPS/Servers";

import {mMonitoring} from "../modules/Monitoring";
import {mExceptions} from "../modules/Exceptions";
import {mEmails} from "../modules/Emails";
import {mUsers} from "../modules/Users";
import {mAuth} from "../modules/Auth";
import {mSessions} from "../modules/Sessions";
import {mExpress} from "../modules/Common/Express";
import {mSubscriptions} from "../modules/Subscriptions";

    // Declare modules
    // They dont require mongo client started before
    // setting up mongo entities


// Specific
// const servers = new Servers.Module({exceptions, subscriptions});

export const app = {
  mMonitoring,
  mExceptions,
  mEmails,
  mUsers,
  mAuth,
  mSessions,
  mExpress,
  mSubscriptions,
};

    // Async stuff required
    // to start app and
    // ONLY THEN operate

export async function startApp() {
  const mongo = new Mongo.Client({ url: env.db.url });
  await mongo.listen();
  // Only now, after mongo started, start express
  initExpressControllers();
  mExpress.listen();
}
