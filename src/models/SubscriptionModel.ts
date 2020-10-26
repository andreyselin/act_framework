import {IException} from "./ExceptionModel";
import {Subscriptions} from "../modules/Subscriptions";
import ISubscriptionParams = Subscriptions.ISubscriptionParams;
import {Expecteds} from "../modules/Common/Expecteds";


export const initSubscriptionModule = (exceptions: Expecteds.IExceptionsModule<IException>) => {
  const defaultSubscriptionParams: ISubscriptionParams = {
    days: 1,
    data: {}
  };
  return new Subscriptions.Module<IException>({exceptions, defaultSubscriptionParams});
};
