import { spawn } from "child_process";
import { scheduleTask } from "./scheduleTask.js";

const dbName = "ecommerce";
const compressionType = "--gzip";
const backupName = `./${Date.now()}.gz`;

function getDBBackup() {
  return new Promise((res, rej) => {
    console.log("db backup started");
    const backupProcess = spawn("mongodump", [
      `--db=${dbName}`,
      `--archive=${backupName}`,
      compressionType,
    ]);

    backupProcess.on("error", (err) => {
      rej(`backup process exited with error ${err}`);
    });

    backupProcess.on("exit", (code, signal) => {
      console.log(code, signal);
      if (code) {
        console.log(`backup process exit with error code ${code}`);
        rej(`backup process exit with error code ${code}`);
      } else if (signal) {
        console.log(`backup process exit with signal ${signal}`);
        rej(`backup process exit with signal ${signal}`);
      } else {
        console.log("backup process completed");
        res();
      }
    });
  });
}

export async function runBackup() {
  try {
    scheduleTask("GET_DB_BACKUP", 1, "*/1 * * * *", getDBBackup);
    // await getDBBackup();
  } catch (error) {}
}
