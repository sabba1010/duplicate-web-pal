import { io, Socket } from "socket.io-client";
import { API_BASE } from "./api";

let socketInstance: Socket | null = null;

export const getSocket = (): Socket => {
  const token = typeof window !== "undefined" ? localStorage.getItem("goc_token") : "";

  if (!socketInstance) {
    socketInstance = io(API_BASE, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
    });
  } else {
    if (socketInstance.auth && (socketInstance.auth as any).token !== token) {
      (socketInstance.auth as any).token = token;
    }
    if (!socketInstance.connected) {
      socketInstance.connect();
    }
  }

  return socketInstance;
};

export const reconnectSocket = (): Socket => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
  return getSocket();
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
