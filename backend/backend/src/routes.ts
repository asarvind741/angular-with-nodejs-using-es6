import * as express from "express";
import { IServer } from "./interfaces/ServerInterface";
import UserRouter from "./commanroutes";
export default class Routes {
  /**
   * @param  {IServer} server
   * @returns void
   */
  static init(server: IServer): void {
    const router: express.Router = express.Router();

        server.app.use("/", router);
        // users
        server.app.use("/api/v1/", new UserRouter().router);

    }
}
