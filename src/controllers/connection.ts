import {Express} from "../modules/Common/Express";
import {hoursFromDays} from "../utilities";
import {IUser} from "../modules/Users";
import {mSubscriptions} from "../modules/Subscriptions";

export const getDashboardController: Express.TInternalController<IUser> = async (user: IUser, params) => {

  // Subscription:
  // used only for measuring time

  const subscription = await mSubscriptions.getOrSubscribeWith(
    user._id,
    async ()=>({
      hours: hoursFromDays(1),
      // Server data:
      data: {} // Todo
    })
  );

  // Connection
  // All logic is here



  return {
    status: 0,
    key: 'ok',
    data: {}
  };
};
