import { Request, Response, NextFunction } from "express";
import { default as Product, ProductModel } from "../models/Product";
import { constants } from "../config/constant";
const formidable = require("formidable");
import multer from "multer";
import { default as Order, OrderModel } from "../models/Order";
const UPLOAD_PATH = "uploads";
const upload = multer({ dest: __dirname + "/productimages/" }); // multer configuration


/**
 * GET /
 * Stock Coverage.
 */
export let getUserOrderProduct = (req: any, res: Response, next: NextFunction) => {

   Order.find({"userId" : req.user._id})
   .populate("productId", "productName, productDescription productImage")
   .then((data) => {
    res.status(200).send({success: true, auth: true, data: data, error : false });
    })
    .catch((error: Error) => {
     res.status(500).send({success: true, auth: true, data: "", error : false, message: error });
   });

};

export let addOrder = (req: any, res: Response, next: NextFunction) => {
    let error = false;
    const message: any = {};
    if (req.body.productId === "" || req.body.productId == undefined) {
      error = true;
      message.productId = "Product id  is required";
    }

    if (error) {
      res.status(400).send({success: false, auth: true, data: "", error : true, message: message });
      return next();
     }
     console.log(req.user);
     req.body.userId = req.user._id;
     Order.create(req.body)
     .then((data) => {
       res.status(200).send({success: true, auth: true, data: "", error : false, message: constants.DATA_ADDED_SUCCESSFULLY });
     })
     .catch((error: Error) => {
       res.status(500).send({success: true, auth: true, data: "", error : false, message: error });
   });
  };
