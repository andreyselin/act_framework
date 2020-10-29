import {Mongo} from "../modules/Common/Mongo";
import {env} from "../env";
import {Express} from "../modules/Common/Express";
import {initExpressControllers} from "../controllers";
import {initSubscriptionModule} from "../models/SubscriptionModel";
import {Servers} from "../modules/FPS/Servers";

import {mMonitoring} from "../modules/Monitoring";
import {mExceptions} from "../modules/Exceptions";
import {mEmails} from "../modules/Emails";
import {mUsers} from "../modules/Users";
import {mAuth} from "../modules/Auth";
import {mSessions} from "../modules/Sessions";

    // Declare modules
    // They dont require mongo client started before
    // setting up mongo entities

// const mongo = new Mongo.Client({ url: env.db.url });
// const express = new Express.Module<IUser>({ port: env.express.port, sessions, exceptions });
// const subscriptions = initSubscriptionModule(exceptions);

// Specific
// const servers = new Servers.Module({exceptions, subscriptions});

export const app = {
  mMonitoring,
  mExceptions,
  mEmails,
  mUsers,
  mAuth,
  mSessions,
  // mongo,
  // express,
  // subscriptions


};

    // Async stuff required
    // to start app and
    // ONLY THEN operate

// export async function startApp() {
//   await app.mongo.listen();
//   // Only now, after mongo started, start express
//   initExpressControllers();
//   app.express.listen();
// }
