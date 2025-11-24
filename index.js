import express from "express";
import { OrderModel } from "./models/OrderModel.js";
import { connectDB } from "./config/db.js";

const app = express();

connectDB();

app.get("/get-orders", async (req, res) => {
  try {
    const response = await OrderModel.find();

    return res.status(200).send({
      success: true,
      message: "Request successful",
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("ecommerce app listening on 3000 port");
});
