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


const db = require("../config/db");
const loginModel = require("../models/model");
const jwt = require("jsonwebtoken");
// 註冊
exports.register = async (req, res) => {
  const { account, password, username } = req.body;

  try {

    await loginModel.createUser(account, password, username);

    res.json({
      message: "註冊成功",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "註冊失敗" });
  }
};
// 登入
exports.login = async (req, res) => {
  try {
    const { account, password } = req.body;

    const user = await userModel.findUserByAccountAndPassword(account, password);

    if (!user) {
      return res.json({
        success: false,
        message: "帳號或密碼錯誤",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        account: user.account,
      },
      "mySecretKey",
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        account: user.account,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "登入失敗",
    });
  }
};

exports.getDB = async (req, res) => {
  res.send("getDB");
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();

    res.json(users);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "查詢失敗",
    });
  }
};





