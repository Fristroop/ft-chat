import passport from "passport";
import { Strategy } from "passport-local";
import { userModel } from "./mongoose.js";
import { v4 } from "uuid";

passport.use(
  new Strategy(async (username, password, done) => {
    const user = await userModel.findOne({ email: username });

    // 404
    if (!user) {
      return done(null, false, { message: "User is not found!" });
    }

    // 403
    if (password !== user.password) {
      return done(null, false, { message: "Invalid password!" });
    }

    // Success
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findOne({ id: id });
  done(null, user);
});

export const UserAuth = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

export const RegisterUser = async (req, res) => {
  let { username, email, password } = req.body;
  username = username.toLowerCase();

  // Kullanıcı adı veya e-posta adresi veritabanında mevcutsa kontrol et
  const userExist = await userModel.findOne({ $or: [{ username }, { email }] });

  if (userExist) {
    return res
      .status(400)
      .send({ message: "This username/mail is already taken!" });
  }

  // Yeni kullanıcı verisini oluştur ve kaydet
  const newUser = await userModel.create({
    id: v4(),
    createdAt: Date.now(),
    username,
    email,
    password,
  });

  res.send(newUser);
};

/**
 *
 * @param {Express.Request} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({ message: "Please log in!" });
};
