import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: Number,
    customerId: String,
    employeeId: Number,
  },
  { collection: "orders" }
);

export const OrderModel = mongoose.model("Order", orderSchema);
