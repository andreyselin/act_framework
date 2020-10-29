import {Subscriptions} from "./index";
import {hoursFromDays} from "../../utilities";

export const defaultSubscriptionParams: Subscriptions.ISubscriptionParams = {
  hours: hoursFromDays(1), // One day
  data: {}
};
