import { v4 } from "uuid";
import { messageModel, roomModel, userModel } from "./helpers/mongoose.js";
import { io } from "./server.js";

// Handle incoming socket connections
io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;

  const rooms = await roomModel.find({ members: userId });
  rooms.map((room) => {
    socket.join(room.id);
  });

  console.log(`${userId} connected.`);

  // Create Room
  socket.on("createRoom", async (data) => {
    console.log(`${userId} created room:`, data);
    const room = await roomModel.create({
      id: v4(),
      name: data.name,
      password: data.password,
      adminId: userId,
      members: [userId],
    });

    socket.emit("joinRoomSuccess", room.id);

    return room;
  });

  // JoinRoom
  socket.on("joinRoom", async ({ roomId, password }) => {
    console.log(`${userId} joined room:`, roomId);

    const room = await roomModel.findOne({ id: roomId });

    if (!room)
      return socket.emit("joinRoomFail", "Room is not found please check id!");

    if (room.members.includes(userId))
      return socket.emit("joinRoomFail", "You have already joined this room!");

    room.members.push(userId);
    await room.save();

    socket.join(roomId);
    socket.emit("joinRoomSuccess", roomId);

    return room;
  });

  socket.on("leaveRoom", async (roomId) => {
    console.log(`${userId} left room:`, roomId);

    const room = await roomModel.findOne({ id: roomId });
    if (!room) return;

    room.members = room.members.filter((r) => r !== userId);

    if (room.members.length == 0) {
      await room.deleteOne();
    } else {
      await room.save();
    }

    return room;
  });

  socket.on("messageCreate", async (content, roomId) => {
    console.log(`${userId} sent '${content}' to ${roomId}`);

    const user = await userModel.findOne({ id: userId }).lean();

    const message = await messageModel.create({
      id: v4(),
      authorId: user.id,
      author: user.username,
      timestamp: Date.now(),
      content,
      roomId,
    });

    const room = await roomModel.findOne({ id: roomId });
    room.lastMessage = message.content;
    room.messages.push(message.id);
    await room.save();

    io.to(roomId).emit("messageCreate", message);

    return message;
  });

  socket.on("disconnect", () => {
    console.log(`User with ID ${userId} disconnected.`);
  });
});
