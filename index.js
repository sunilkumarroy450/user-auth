require("dotenv").config();
global.appRoot = __dirname;
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const connection = require("./config/database");
const router = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
