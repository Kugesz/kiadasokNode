import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import User from "../data/user.js";

const initialize = (passport, getUserByName, getUserById) => {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByName(username);
    if (user == null) {
      return done(null, false, { message: "No user was found with that name" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initialize;
