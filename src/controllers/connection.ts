import {IUser} from "../models/UserModel";
import {Express} from "../modules/Common/Express";

export const getConnectionInfoController: Express.TInternalController<IUser> = async (user: IUser, params) => {

  return {
    status: 0,
    data: {}
  };
};
