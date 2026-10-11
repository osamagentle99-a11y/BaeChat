import { io } from "socket.io-client";
import { storage } from "./storage";

// Apna backend IP yahan lagao
const SOCKET_URL = "http://192.168.1.10:5000"; // apna IP

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