const db = require("../config/db");


// 新增使用者
const createUser = async (account, password, username) => {
  const sql = `
    INSERT INTO login (account, password, username)
    VALUES ($1, $2, $3)
  `;

  return await db.query(sql, [account, password, username]);
};


// 取得登入帳密
const getUsers = async () => {
  const sql = "SELECT * FROM login";
  const result = await db.query(sql);

  return result.rows;
};

// 登入
const findUserByAccountAndPassword = async (account, password) => {
  const sql = `
    SELECT id, account, username
    FROM login
    WHERE account = $1 AND password = $2
  `;

  const result = await db.query(sql, [account, password]);

  return result.rows[0];
};

module.exports = {
  createUser,
  getUsers,
  findUserByAccountAndPassword,
};




