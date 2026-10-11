const dns = require("dns");
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const User = require("./models/User"); // <-- ye add karo

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));

app.get("/", (req, res) => {
  res.send("Bae API is running with Socket.io ❤");
});

// ===== WHATSAPP JESA LAST SEEN LOGIC =====
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("addUser", async (userId) => {
    onlineUsers[userId] = socket.id;

    // ✅ DB me bhi Online karo - yehi tum miss kar rahe thay
    try {
      await User.findByIdAndUpdate(userId, {
        isOnline: true,
        lastSeen: new Date()
      });
      console.log(`User ${userId} is now ONLINE in DB`);
    } catch (e) { console.log(e); }

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", { senderId, text });
    }
  });

  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("userTyping", senderId);
    }
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);
    let disconnectedUserId = null;
    for (let userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        disconnectedUserId = userId;
        delete onlineUsers[userId];
        break;
      }
    }

    // ✅ DB me bhi Offline + lastSeen update - yehi WhatsApp hai
    if (disconnectedUserId) {
      try {
        await User.findByIdAndUpdate(disconnectedUserId, {
          isOnline: false,
          lastSeen: new Date()
        });
        console.log(`User ${disconnectedUserId} is now OFFLINE, lastSeen updated`);
      } catch (e) { console.log(e); }
    }

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Bae server running on port ${PORT} with Socket.io`));