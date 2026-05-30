const { Pool } = require("pg");
require("dotenv").config();
console.log("DATABASE_URL =", process.env.DATABASE_URL);
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("PostgreSQL 連線成功"))
  .catch((err) => console.error("資料庫連線失敗:", err));

module.exports = db;
