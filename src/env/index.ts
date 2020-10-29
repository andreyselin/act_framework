import {IEnv} from "../modules/Env";

export const env: IEnv = {
  db: {
    url: 'mongodb://localhost/my_db'
  },
  monitoring:{
    // isOn: true, // think later what to do with it
    api: 'address'
  },
  express: {
    port: 3001
  }
};
