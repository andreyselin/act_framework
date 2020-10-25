import {Request, Response} from 'express';
import {IUser} from "./UserModel";


export type TExternalController = (req: Request, res: Response) => any

export interface InternalRequest extends Request{
  user: IUser;
}
export type TInternalController = (req: InternalRequest, res: Response) => any
