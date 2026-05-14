// const mysql = require("mysql2");

// // 建立連線
// const db = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "asas621201",
//   database: "vue3"
// });

// db.connect((err) => {
//   if (err) {
//     console.error("資料庫連線失敗:", err);
//   } else {
//     console.log("資料庫連線成功");
//   }
// });

// module.exports = db;

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



