import express, { Request, Response } from 'express';
import {Expecteds} from "./Expecteds";


export namespace Express {

  interface IConfig<_IUser, _IException> {
    port: number;
    sessions: Expecteds.ISessionsModule<_IUser, _IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;
  }


  // Bind somehow with _IException
  interface IControllerResponse {
    status: number;
    message?: string;
    data: any;
  }

  export type TExternalController = (params) => Promise<IControllerResponse>

  export type TInternalController<_IUser> = (user: _IUser, params) => Promise<IControllerResponse>


    //////////////////
    //              //
    //    Module    //
    //              //
    //////////////////


  const app = express();
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  export class Module<_IUser, _IException> {

    port: number;
    sessions: Expecteds.ISessionsModule<_IUser, _IException>;
    exceptions: Expecteds.IExceptionsModule<_IException>;

    constructor({port, sessions, exceptions}: IConfig<_IUser, _IException>) {
      this.port = port;
      this.sessions = sessions;
      this.exceptions = exceptions;
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
      controller: TInternalController<_IUser>
    ) {
      app[method](path, async (req: Request, res: Response) => {
        try {
          const token = (req.headers && req.headers['authorization']) || null;
          const user = await this.sessions.getUserIfTokenIsActive(token);
          if (this.exceptions.check(user) as _IException) {
            res.status(403).json(this.exceptions.defaultException);
            return;
          }
          const params = method === 'get' ? req.query : req.body;
          const result = await controller(user as _IUser, params);
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



