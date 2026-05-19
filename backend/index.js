// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// console.log(process.env.DATABASE_URL);
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// app.use(cors());
// app.use(express.json());

// const routes = require("./scr/routes/routes");

// app.use("/api", routes);

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

// app.use(cors({
//   origin: "https://Leonwei1206.github.io"
// }));

// -------------------------------------------------------------------


const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://leonwei1206.github.io"
  ]
}));

app.use(express.json());

const routes = require("./scr/routes/routes");

app.use("/api", routes);

// 建立 HTTP Server
const server = http.createServer(app);

// 建立 Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://leonwei1206.github.io"
    ],
    methods: ["GET", "POST"]
  }
});

// 在線使用者
const onlineUsers = new Map();

// WebSocket 連線
io.on("connection", (socket) => {

  console.log("使用者連線:", socket.id);

  socket.on("userOnline", (user) => {

    onlineUsers.set(socket.id, user);

    io.emit(
      "onlineUsers",
      Array.from(onlineUsers.values())
    );

  });
  socket.on("sendMessage", (msg) => {
    const message = {
      id: Date.now().toString(),
      userId: msg.userId,
      username: msg.username,
      content: msg.content,
      createdAt: new Date().toISOString()
    };

    io.emit("newMessage", message);
  });



  socket.on("disconnect", () => {

    onlineUsers.delete(socket.id);

    io.emit(
      "onlineUsers",
      Array.from(onlineUsers.values())
    );

    console.log("使用者離線:", socket.id);

  });

});



const PORT = process.env.PORT || 3000;



// 啟動 Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





