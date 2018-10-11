import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";

export type OrderModel = mongoose.Document & {
    productId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
};

const orderSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
