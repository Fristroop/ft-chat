import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

const dir = fs.existsSync("uploads");
if(!dir) fs.mkdirSync("uploads");

const storage = multer.diskStorage({
   destination: "uploads",
   filename: (req, file, cb) => {
      cb(null, uuid() + "." + file.mimetype.split("/")[1]);
   },
});

export const upload = multer({ storage: storage });
