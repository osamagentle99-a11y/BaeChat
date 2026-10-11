import { io } from "socket.io-client";
import { storage } from "./storage";

// ✅ LIVE BACKEND - Ab IP ka chakkar khatam
const SOCKET_URL = "https://baechat-2n1h.onrender.com";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["websocket"]
});

socket.on("connect", async () => {
  console.log("Socket connected:", socket.id);
  const userData = await storage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    socket.emit("addUser", user._id || user.id);
  }
});

export default socket;