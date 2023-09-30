import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoDBStore from "connect-mongodb-session";
import cors from "cors";

// Socket
import { Server } from "socket.io";
import { createServer } from "http";

// Local
import { router } from "./routers/router.js";
import { upload } from "./helpers/multer.js";
import { config } from "./config.js";

const app = express();

// cors
app.use(
  cors({
    origin: process.env.origin,
    credentials: true,
  })
);

// Socket IO
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.origin,
  },
});

// Body resolvers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// File Uploads
app.use(upload.any());

// Passport
const store = MongoDBStore(session);

app.use(
  session({
    secret: process.env.secret_key,
    resave: true,
    saveUninitialized: true,
    store: new store({
      uri: process.env.mongodb,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Route
app.use(router);

// Listen
server.listen(config.port, () =>
  console.log(`Server is running on http://localhost:${config.port}`)
);
