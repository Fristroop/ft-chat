import express from "express";

import { RegisterUser, UserAuth, isLoggedIn } from "../helpers/passport.js";

const router = express.Router();
export const UsersRouter = router;

router.get("/@me", isLoggedIn, (req, res) => {
  let user = req.user;
  user.password = "";
  res.send(user);
});

router.post("/auth", UserAuth) 
router.post("/register", RegisterUser )
