import "dotenv/config";
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import userModel from "./models/user.model.js";
import { generateContent } from "./services/ai.service.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// Middleware (checksfor if data is real)
io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];
    const projectId = socket.handshake.query?.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Project ID is required"));
    }
    socket.project = await projectModel.findById(projectId);

    if (!token) {
      return next(new Error("Authorization error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authorization error"));
    }

    socket.user = decoded;
    // console.log(socket);

    next();
  } catch (err) {
    next(err);
  }
});

io.on("connection", (socket) => {
  socket.roomId = socket.project._id.toString();

  console.log("➜  A user connected");
  socket.join(socket.roomId);

  socket.on("project-message", async (data) => {
    try {
      const user = await userModel.findById(data.sender).select("email");
      const message = data.message;
      const modifiedData = {
        message,
        sender: {
          id: user._id.toString(),
          email: user.email,
        },
      };
      const aiCalled = message.includes("@ai");
      socket.broadcast.to(socket.roomId).emit("project-message", modifiedData);

      if (aiCalled) {
        const prompt = message.replace("@ai", "");
        const respones = await generateContent(prompt);

        // use io becuse we want to send the respones toall the people in the room not a individual
        io.to(socket.roomId).emit("project-message", {
          message: respones,
          sender: {
            id: "ai",
            email: "AI",
          },
        });
      }
    } catch (err) {
      console.error("Error :", err);
    }
  });
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    console.log("➜  User Disconnected");
    socket.leave(socket.roomId);
  });
});

server.listen(port, () => {
  console.log(`➜  Server running on port [${port}]`);
});
