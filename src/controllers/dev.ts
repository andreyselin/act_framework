import {app} from "../app";
import {TExternalController} from "../models/AppModel";


export const pingController: TExternalController = async (req, res) => {
  const user = await app.users.create({});
  console.log('app.users.create:', user);
};
