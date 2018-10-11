import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";


export type ProductModel = mongoose.Document & {
    productName: String;
    productImage: String;
    productDescription: String;
};

const productSchema = new mongoose.Schema({
    productName: {type: String, unique: true},
    productImage: {type: String},
    productDescription: {type: String}
});

const Product = mongoose.model("Product", productSchema);
export default Product;
