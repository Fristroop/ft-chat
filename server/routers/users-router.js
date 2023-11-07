import express from "express";
import passport from "passport";

import { RegisterUser,  isLoggedIn } from "../helpers/passport.js";

const router = express.Router();
export const UsersRouter = router;

router.get("/@me", isLoggedIn, (req, res) => {
  let user = req.user;
  user.password = "";
  res.send(user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(user)
      return res.send(user);
    });
  })(req, res, next);
});

router.post("/register", RegisterUser);
