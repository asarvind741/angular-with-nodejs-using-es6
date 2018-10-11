const fs = require("fs-extra");
import { Request, Response, NextFunction } from "express";
import { default as Product, ProductModel } from "../models/Product";
import { constants } from "../config/constant";
const formidable = require("formidable");
import multer from "multer";

const UPLOAD_PATH = "uploads";
const upload = multer({ dest: __dirname + "/productimages/" }); // multer configuration


/**
 * GET /
 * Stock Coverage.
 */
export let addProduct = (req: any, res: Response, next: NextFunction) => {
  let error = false;
  const message: any = {};
  if (req.body.productName === "" || req.body.productName == undefined) {
    error = true;
    message.productName = "Product name  is required";
  }
  if (req.body.productDescription === "" || req.body.productDescription == undefined) {
    error = true;
    message.productDescription = "Product description is required";
  }

  if (error) {
    res.status(400).send({success: false, auth: true, data: "", error : true, message: message });
    return next();
   }

   Product.create(req.body)
   .then((data) => {

     res.status(200).send({success: true, auth: true, data: "", error : false, message: constants.DATA_ADDED_SUCCESSFULLY });
   })
   .catch((error: Error) => {
     res.status(500).send({success: true, auth: true, data: "", error : false, message: error });
 });

};

export let getProduct = (req: any, res: Response, next: NextFunction) => {

  Product.find()
   .then((data) => {
     res.status(200).send({success: true, auth: true, data: data, error : false });
   })
   .catch((error: Error) => {
     res.status(500).send({success: true, auth: true, data: "", error : false, message: error });
 });

};


