import {app} from "../app";
import {TExternalController} from "../models/AppModel";


export const pingController: TExternalController = async (params) => {
  const user = await app.users.create({});
  console.log('app.users.create:', user);
  return {
    status: 0,
    data: null
  }
};
