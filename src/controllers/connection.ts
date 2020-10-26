import {IUser} from "../models/UserModel";
import {Express} from "../modules/Common/Express";

export const getConnectionInfoController: Express.TInternalController<IUser> = async (user: IUser, params) => {

  // Get or create here


  return {
    status: 0,
    data: {}
  };
};
