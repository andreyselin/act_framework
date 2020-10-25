import {app} from "../app";
import {Express} from "../modules/Common/Express";


export const pingController: Express.TExternalController = async (params) => {
  const user = await app.users.create({});
  console.log('app.users.create:', user);
  return {
    status: 0,
    data: null
  }
};
