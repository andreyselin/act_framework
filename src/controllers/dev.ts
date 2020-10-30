import {Express} from "../modules/Common/Express";
import {mUsers} from "../modules/Users";


export const pingController: Express.TExternalController = async (params) => {
  const user = await mUsers.create({});
  return {
    status: 0,
    key: 'ok',
    data: {
      user,
      params
    }
  }
};
