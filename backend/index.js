const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.DATABASE_URL);
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors());
app.use(express.json());

const routes = require("./scr/routes/routes");

app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.use(cors({
  origin: "https://Leonwei1206.github.io"
}));