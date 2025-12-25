import { Server } from "socket.io";
import jwt from "jsonwebtoken";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("No token"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.userId);

    socket.on("join-room", ({ roomId }) => {
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", socket.user.userId);
    });

    socket.on("signal", ({ roomId, data }) => {
      socket.to(roomId).emit("signal", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
