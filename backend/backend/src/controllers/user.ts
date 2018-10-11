import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import passport from "passport";
import { default as User, UserModel } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import "../config/passport";
import { sign } from "jsonwebtoken";
import { constants } from "../config/constant";
import { postContact } from "../controllers/contact";
import bcrypt from "bcrypt-nodejs";

export let postSignup = (req: Request, res: Response, next: NextFunction) => {

  let error = false;
  const message: any = {};
  if (req.body.email === "" || req.body.email == undefined) {
    error = true;
    message.email = "Email is required";
  }
  if (req.body.firstName === "" || req.body.firstName == undefined) {
    error = true;
    message.firstName = "First name is required";
  }
  if (req.body.lastName === "" || req.body.lastName == undefined) {
    error = true;
    message.lastName = "Last name is required";
  }
  if (req.body.password === "" || req.body.password == undefined) {
    error = true;
    message.password = "Password is required";
  }


  if (error) {
    res.status(400).send({success: false, auth: true, data: "", error : true, message: message });
    return next();
   }

    req.body["emailVerification"] = false;
    const user = new User(req.body);

    User.findOne({ email: req.body.email }, (err, existingUser: UserModel) => {
      if (err) { return next(err); }

      if (existingUser) {
          res.status(200).send({success: true, auth: true, data: "", error : false, message: constants.USER_ALREADY_EXIST});
          return false;
      } else {
          user.save((err: Error) => {
            if (err) {
              res.status(500).send({success: false, auth: true, data: "", error : true, message: err, token: ""   });
            } else {
              const payload = { email: req.body.email};
              const token = sign(payload, constants.jwtKey);
              postContact(token, req.body.email);
              res.status(200).send({success: true, auth: true, data: "", error : false, message: constants.USER_REGISTOR_SUCCESSFULLY});
            }
          });
      }
    });
};

export let login = (req: Request, res: Response, next: NextFunction) => {
   console.log(login);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(req.body.password, salt, undefined, (err: Error, hash) => {
      if (err) { return next(err); }
      User.findOne({"email": req.body.email, "password": hash}, (err, existingUser: UserModel) => {
        if (err) { return next(err); }
        if (existingUser) {
        const payload = { email: existingUser.email};
        res.status(200).send({success: true, auth: true, data: "", error : false, message: constants.DATA_ADDED_SUCCESSFULLY, token: sign(payload, constants.jwtKey) });
        }else {
          res.status(200).send({success: true, auth: true, data: "", error : true, message: "No user found", token: "" });
        }
      })
    });
  });
};

export let getVerifyEmail = (req: Request, res: Response, next: NextFunction) => {
  User.update({"email" : req.user.email},{$set: {"emailVerification": true}}).then((data) => {
    res.status(200).send({success: true, auth: true, data: "", error : true, message: "Email verify successfully" });
  })
}


