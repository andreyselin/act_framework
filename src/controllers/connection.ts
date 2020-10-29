import {Express} from "../modules/Common/Express";
import {hoursFromDays} from "../utilities";
import {IUser} from "../modules/Users";
import {mSubscriptions} from "../modules/Subscriptions";

export const getConnectionInfoController: Express.TInternalController<IUser> = async (user: IUser, params) => {

  const data = {

  };

  // Get or create here
  const subscription = await mSubscriptions.getOrSubscribeWith(
    user._id,
    async ()=>({
      hours: hoursFromDays(1),
      // Server data:
      data: {} // Todo
    })
  );


  return {
    status: 0,
    key: 'ok',
    data: {}
  };
};
