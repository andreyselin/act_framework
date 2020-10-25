import express from 'express';
import {env} from "../env";
import {pingController} from "../controllers/dev";
const app = express();


export function runExpress () {

  app.get('/dev/ping', pingController);


  app.listen(env.express.port, () => {
    console.log(`Example app listening at http://localhost:${env.express.port}`)
  });

}
