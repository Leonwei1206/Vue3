// const db = require("../models/model");
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { account, password } = req.body

//   console.log(account, password)

//   const insertSql = `
//     INSERT INTO login (account, password)
//     VALUES (?, ?)
//   `

//   db.query(insertSql, [account, password], (err, result) => {
//     if (err) {
//       console.log(err)
//       return res.status(500).json({ message: '註冊失敗' })
//     }

//     res.json({
//       message: '註冊成功'
//     })
//   })
// }

// exports.login = (req, res) => {
//   const { account, password } = req.body

//   const sql = `
//     SELECT * FROM login
//     WHERE account = ? AND password = ?
//   `

//   db.query(sql, [account, password], (err, result) => {
//     if (err) return res.status(500).json({ success: false })


//     if (result.length > 0) {
//       const user = result[0];
//       //  產生 token
//       const token = jwt.sign(
//         {
//           id: user.id,
//           account: user.account
//         },
//         'mySecretKey', // 👉 之後可以改成 env
//         { expiresIn: '1h' }
//       )
//       res.json({ success: true, token })
//     } else {
//       res.json({ success: false })
//     }
//   })
// }


// exports.getDB = async (req, res) => {

//   res.send("getDB");
// };

// exports.getUsers = (req, res) => {
//   const sql = "SELECT * FROM login";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("查詢失敗");
//     }

//     res.json(results);
//   });
// };


// --------------POSTSQL------------------------------------------------------


const db = require("../models/model");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { account, password } = req.body;

  const insertSql = `
    INSERT INTO login (account, password)
    VALUES ($1, $2)
  `;

  try {
    await db.query(insertSql, [account, password]);

    res.json({
      message: "註冊成功",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "註冊失敗" });
  }
};

exports.login = async (req, res) => {
  const { account, password } = req.body;

  const sql = `
    SELECT * FROM login
    WHERE account = $1 AND password = $2
  `;

  try {
    const result = await db.query(sql, [account, password]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      const token = jwt.sign(
        {
          id: user.id,
          account: user.account,
        },
        "mySecretKey",
        { expiresIn: "1h" }
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false });
  }
};

exports.getDB = async (req, res) => {
  res.send("getDB");
};

exports.getUsers = async (req, res) => {
  const sql = "SELECT * FROM login";

  try {
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("查詢失敗");
  }
};






