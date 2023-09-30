import express from "express";
import { UsersRouter } from "./users-router.js";
import { messageModel, roomModel } from "../helpers/mongoose.js";
import { isLoggedIn } from "../helpers/passport.js";

const app = express.Router();
export const router = app;

router.use("/users", UsersRouter);

app.get("/", (req, res) => {
  res.send({ msg: "Hello World! Wassup?" });
});

app.get("/rooms", isLoggedIn, async (req, res) => {
  const rooms = await roomModel.find({ members: req.user.id });
  res.send(rooms);
});

app.get("/rooms/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  const room = await roomModel.findOne({ id });
  if (!room) return res.status(400).send({});
  
  room.messages = await messageModel.find({ roomId: room.id });

  res.send(room);
});
