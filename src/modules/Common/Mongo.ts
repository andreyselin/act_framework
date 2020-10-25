
// Move to special servers directory

import mongoose from 'mongoose';
import * as bluebird from 'bluebird';


mongoose.set('debug', process.env.MONGODB_DEBUG);
(<any>mongoose).Promise = bluebird.Promise;

export namespace Mongo {
  export class Client {
    url: string;

    constructor({ url }) {
      this.url = url;
    }

    client: mongoose.Mongoose;

    async listen() {

      mongoose.connection.on('error', err => {
        console.log('-mongoose-connection-error', err);
      });

      mongoose.connection.on('disconnected', function(){
        console.log('-mongoose-DISCONNECTED-');
      });

      this.client = await mongoose.connect(this.url, {
        poolSize: 20,
        reconnectTries: 100,
        reconnectInterval: 5000,
        useNewUrlParser: true,
        useFindAndModify: false,
        promiseLibrary: bluebird.Promise,
        // replicaSet: environment.db.rsName
      });
      console.info('Connected to MongoDB');
    }
  }
}
