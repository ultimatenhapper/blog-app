const express = require("express");
const cors = require("cors");
const blogRouter = require("./route/blog-route");

require("./db");

const app = express();
const dotenv = require("dotenv");

app.use(cors());
app.use(express.json());

dotenv.config({ path: "./config.env" });

app.use("/api/blogs", blogRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running at ${process.env.PORT || 3000}...`);
});
