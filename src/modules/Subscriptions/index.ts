import {Document, model, Model, Schema} from "mongoose";
import shortid from 'shortid';
import {addHoursMutable} from "../../utilities";
import {Exceptions, mExceptions} from "../Exceptions";
import {defaultSubscriptionParams} from "./extension";

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


  interface IConfig {
    defaultSubscriptionParams: any;
  }

  export interface ISubscriptionParams {
    hours: number; // Use 0 for inactive initial subscription
    data: any; // Data to assign to Subscription
  }

      //////////////////

  export class Module {
    defaultSubscriptionParams: ISubscriptionParams;

    constructor({defaultSubscriptionParams}: IConfig) {
      this.defaultSubscriptionParams = defaultSubscriptionParams;
    }

    async getOrSubscribeWith(userId: string, generateSubscriptionParams: () => Promise<ISubscriptionParams>): Promise<ISubscription | Exceptions.IException> {
      try {
        // Check if not exist
        const existingSubscription = await this.getByUserId(userId);

        // Handle error
        if (mExceptions.isAny(existingSubscription)) {
          return existingSubscription as Exceptions.IException;
        }

        // If subscription exists (if it is not null) - return it:
        if (existingSubscription) {
          return existingSubscription;
        }

        // If no subscription found (is null)
        // Create default subscription
        const subscription = await this.subscribe(userId, this.defaultSubscriptionParams);

        // Either it is subscription or exception
        return subscription;

      } catch (e) {
        return mExceptions.catched('Subscriptions.getOrSubscribeWith caught', {userId}, e);
      }
    }

    async countSubscriptions (query: object) {
      try {
        return await Subscription.countDocuments(query);
      } catch (e) {
        return mExceptions.catched('countSubscriptions caught', query, e);
      }
    }

    async subscribe(userId: string, subscriptionParams: ISubscriptionParams) {
      try {
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
        return await newSubscription.save();
      } catch (e) {
        return mExceptions.catched('Subscriptions.subscribe caught', { userId, subscriptionParams }, e);
      }
    }

    // Returns also null because
    // it is not necessarily a fault
    async getByUserId (userId: string): Promise <ISubscription | null | Exceptions.IException> {
      try {
        return await Subscription.findById(userId);
      } catch (e) {
        return mExceptions.catched('Sessions.getByUserId caught', {userId}, e);
      }
    }

  }
}


export const mSubscriptions = new Subscriptions.Module({defaultSubscriptionParams});
