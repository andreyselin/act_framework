import express, { Request, Response } from 'express';
import {Exceptions, mExceptions} from "../Exceptions";
import {IEnv} from "../Env";
import {mSessions} from "../Sessions";
import {IUser} from "../Users";
import {env} from "../../env";


export namespace Express {


  // Bind somehow with _IException
  interface IControllerResponse extends Exceptions.IException {
    status: number;
    key: string;
    data: any;
  }

  export type TExternalController = (params) => Promise<IControllerResponse>

  export type TInternalController<IUser> = (user: IUser, params) => Promise<IControllerResponse>


    //////////////////
    //              //
    //    Module    //
    //              //
    //////////////////


  const app = express();
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  export class Module {

    port: number;

    constructor(env: IEnv) {
      this.port = env.express.port;
    }

    addExternalController (
      method: 'get' | 'post',
      path: string,
      controller: TExternalController
    ) {
      app[method](path, async (req: Request, res: Response) => {
        try {
          const params = method === 'get' ? req.query : req.body;
          const result = await controller(params);
          res.status(200).json(result);
        } catch (e) {
          res.status(500).json(e);
        }
      })
    };


    // Todo: For non-authenticated just check if there is
    //   this.users and throw errors if there is no
    addInternalController (
      method: 'get' | 'post',
      path: string,
      controller: TInternalController<IUser>
    ) {
      app[method](path, async (req: Request, res: Response) => {
        try {
          const token = (req.headers && req.headers['authorization']) || null;
          const user = await mSessions.getUserIfTokenIsActive(token);
          if (mExceptions.check(user) as Exceptions.IException) {
            res.status(403).json(mExceptions.cast('notAllowed', 'internalConroller'));
            return;
          }
          const params = method === 'get' ? req.query : req.body;
          const result = await controller(user as IUser, params);
          res.status(200).json(result);
        } catch (e) {
          res.status(500).json(e);
        }
      })
    };




    listen () {

      app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
      });

    }
  }

}


export const mExpress = new Express.Module(env);

