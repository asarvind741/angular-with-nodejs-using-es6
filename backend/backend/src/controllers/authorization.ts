const fs = require("fs-extra");
import { Request, Response, NextFunction } from "express";
import { default as Product, ProductModel } from "../models/Product";
import { constants } from "../config/constant";
import { verify } from "jsonwebtoken";
import { default as User, UserModel } from "../models/User";

/**
 * GET /
 * Stock Coverage.
 */
export let verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send({ auth: false, message: "No token provided." });
    verify(token,  constants.jwtKey, (err: any, decoded: any) => {
      if (err) return res.status(401).send({ auth: false, message: "Failed to authenticate token." });
      User.findOne({"email": decoded.email}).then((user) => {
        if (!user) return res.status(404).send({ success: false, message: "No user found." });
        req.user = user;
        next();
      });
    });

};


export let isAuthenticate = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    verify(token,  constants.jwtKey, (err: any, decoded: any) => {
      if (err) return res.status(401).send({ auth: false, message: "Failed to authenticate token." });
      User.findOne({"email": decoded.email}).then((user) => {
        if (!user) {return res.status(404).send({ success: false, message: "No user found." }); }
        else {
          res.status(200).send({ success: true, message: "No user found." });
        }

      });
    });

};
