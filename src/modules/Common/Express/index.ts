import express, { Request, Response } from 'express';


export namespace Express {

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

  export class Module {

    port: number;

    constructor({port}: {port: number}) {
      this.port = port;
    }

    addExternalController (
      method: 'get' | 'post',
      path: string,
      controller: TExternalController
    ) {
      console.log({method, path});
      app[method](path, async (req: Request, res: Response) => {
        console.log('called');
        try {
          const params = method === 'get' ? req.query : req.body;
          const result = await controller(params);
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



