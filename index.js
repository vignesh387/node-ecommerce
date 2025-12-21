import express from "express";
import { OrderModel } from "./models/OrderModel.js";
import { connectDB } from "./config/db.js";
import { agenda } from "./cron-job.js";
import cors from "cors";

const app = express();

connectDB();
(async function () {
  await agenda.start();

  await agenda.schedule("in 1 minute", "GET_ORDER_COUNT");

  // await agenda.cancel();

  // agenda.every("*/10 * * * * *", "GET_ORDER_COUNT");
  // agenda.every("*/10 * * * * *", "GET_ORDER_COUNT");
  // await runBackup();
})();

app.use(cors({ origin: "http://localhost:5174" }));

app.get("/get-orders", async (req, res) => {
  try {
    const response = await OrderModel.find();
    console.log("request received", response.length);
    return res.status(200).send({
      success: true,
      message: "Request successful",
      data: response,
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("ecommerce app listening on 3000 port");
});
