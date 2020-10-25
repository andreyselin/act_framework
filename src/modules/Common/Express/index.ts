import express, { Request, Response } from 'express';
const app = express();


export namespace Express {

  interface IControllerResponse {
    status: number;
    message?: string;
    data: any;
  }

  export type TExternalController = (params) => Promise<IControllerResponse>

  export type TInternalController<_IUser> = (user: _IUser, params) => Promise<IControllerResponse>


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

    listen () {

      app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
      });

    }
  }

}



