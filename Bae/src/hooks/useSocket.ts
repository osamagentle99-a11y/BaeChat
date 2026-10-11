import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../services/api";

export const useSocket = (userId: string | null) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(BASE_URL);
    newSocket.emit("addUser", userId);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return socket;
};