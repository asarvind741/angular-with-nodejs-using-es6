import { Router } from "express";
import * as userController from "./controllers/user";

/**
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.post("/signup", userController.postSignup);
    }
}