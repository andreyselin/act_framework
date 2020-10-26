import {IException} from "./ExceptionModel";
import {Subscriptions} from "../modules/Subscriptions";
import ISubscriptionParams = Subscriptions.ISubscriptionParams;
import {Expecteds} from "../modules/Common/Expecteds";
import {hoursFromDays} from "../utilities";


export const initSubscriptionModule = (exceptions: Expecteds.IExceptionsModule<IException>) => {
  const defaultSubscriptionParams: ISubscriptionParams = {
    hours: hoursFromDays(1), // One day
    data: {}
  };
  return new Subscriptions.Module<IException>({exceptions, defaultSubscriptionParams});
};
