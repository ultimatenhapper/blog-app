const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then((con) => {
    // console.log(con.connections);
    console.log("DB connection succesful");
  })
  .catch((error) => console.log(error));
