import mongoose, { Schema } from "mongoose";

mongoose.set("strictQuery", true);
await mongoose
  .connect(process.env.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connection is successfull!"))
  .catch((err) => {
    throw new Error(err);
  });

// User Model
export const userModel = mongoose.model(
  "user",
  new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    createdAt: { type: String },
    lastLogin: { type: Object },
  })
);

// Message Model
export const messageModel = mongoose.model(
  "message",
  new Schema({
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    roomId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: String, required: true },
    seenBy: { type: [] },
  })
);

// Message Model
export const roomModel = mongoose.model(
  "room",
  new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    adminId: { type: String },
    lastMessage: { type: String },
    members: { type: [] },
    messages: { type: [] },
  })
);
