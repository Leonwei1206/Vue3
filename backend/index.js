const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.DATABASE_URL);
const app = express();

app.use(cors());
app.use(express.json());

const routes = require("./scr/routes/routes");

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});