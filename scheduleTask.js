import Agenda from "agenda";

const URI =
  "mongodb+srv://vignesh:M0ng0DBAtlaS@cluster0.oiwo173.mongodb.net/ecommerce";

const agenda = new Agenda({ db: { address: URI } });

export function scheduleTask(taskName, concurrency, cronTimer, cb) {
  agenda.define(taskName, { concurrency }, async () => {
    await cb();
  });

  (async () => {
    await agenda.start();
    await agenda.every(cronTimer, taskName);
  })();
}
