import Agenda from "agenda";
import { OrderModel } from "./models/OrderModel.js";

const uri =
  "mongodb+srv://vignesh:M0ng0DBAtlaS@cluster0.oiwo173.mongodb.net/ecommerce";

export const agenda = new Agenda({ db: { address: uri } });

agenda.define("GET_ORDER_COUNT", { concurrency: 2 }, async (job) => {
  try {
    console.log("job started");
    await new Promise((res) => setTimeout(res, 5000));
    // const response = await OrderModel.countDocuments();
    console.log("job end");
  } catch (error) {
    console.log("agenda cron error", error);
  }
});

// agenda.every("2 seconds", "GET_ORDER_COUNT");
