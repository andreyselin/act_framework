import {Request, Response} from 'express';
import {IUser} from "./UserModel";

interface IControllerResponse {
  status: number;
  message?: string;
  data: any;
}

export type TExternalController = (params) => Promise<IControllerResponse>

// export type TInternalController = (user: IUser, params) => Promise<IControllerResponse>
