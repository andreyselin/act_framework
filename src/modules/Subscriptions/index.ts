import {Expecteds} from "../Common/Expecteds";
import {Document, model, Model, Schema} from "mongoose";
import shortid from 'shortid';
import {addHoursMutable} from "../../utilities";

export namespace Subscriptions {


      //////////////////
      //              //
      //    Mongo     //
      //              //
      //////////////////


  export interface ISubscription extends Document {
    _id: string,
    userId: string;
    data: any;
    createdAt: Date;
    updatedAt: Date;
    subscribedTo: Date;
  }

  const SubscriptionSchema: Schema = new Schema({
    _id: {
      'type': String,
      'default': shortid.generate
    },
    userId: String,
    data: Object,
    createdAt: Date,
    updatedAt: Date,
    subscribedTo: Date,
  });

  export const Subscription: Model<ISubscription> = model<ISubscription>('subscription', SubscriptionSchema);


      //////////////////
      //              //
      //    Module    //
      //              //
      //////////////////


  interface IConfig<_IException> {
    exceptions: Expecteds.IExceptionsModule<_IException>;
    defaultSubscriptionParams: any;
  }

  export interface ISubscriptionParams {
    hours: number; // Use 0 for inactive initial subscription
    data: any; // Data to assign to Subscription
  }

      //////////////////

  export class Module<_IException> {
    exceptions: Expecteds.IExceptionsModule<_IException>;
    defaultSubscriptionParams: ISubscriptionParams;

    constructor({exceptions, defaultSubscriptionParams}: IConfig<_IException>) {
      this.exceptions = exceptions;
      this.defaultSubscriptionParams = defaultSubscriptionParams;
    }

    async getOrSubscribeWithDefault (userId: string) {
      try {
        // Check if not exist
        const existingSubscription = await this.getByUserId(userId);

        // Handle error
        if (this.exceptions.check(existingSubscription)) {
          return existingSubscription;
        }

        // If subscription exists - return it:
        if (existingSubscription) {
          return existingSubscription;
        }

        // Create default subscription
        const subscription = this.subscribe(userId, this.defaultSubscriptionParams);

      } catch (e) {
        return this.exceptions.create('Sessions.getByUserId catched', {userId});
      }

    }

    async subscribe(userId: string, subscriptionParams: ISubscriptionParams) {
      const subscribedTo = addHoursMutable(new Date(), subscriptionParams.hours);
      console.log('subscribe', {
        subscribedTo,
        now: new Date(),
        hours: subscriptionParams.hours
      });
      const newSubscription = new Subscription({
        userId,
        data: subscriptionParams.data,
        subscribedTo
      });
    }

    async getByUserId (userId: string): Promise <ISubscription | null | _IException> {
      try {
        return await Subscription.findById(userId);
      } catch (e) {
        return this.exceptions.create('Sessions.getByUserId catched', {userId});
      }
    }

  }

}
