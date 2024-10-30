import __dirname from "../util/rootpath.js";
import path from "path";
import fs from "fs";

import User from "../data/user.js";

import bcrypt from "bcrypt";

export const loadePage = (req, res, next) => {
  res.render("register.ejs", {
    pageTitle: "Regisztráció",
    path: "/",
    editing: false,
  });
};

export const newRegister = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (await checkUsername(username)) {
    console.error("This user is already existing!");
    return res.redirect("/login");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 2);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
};

const checkUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });

    return user !== null;
  } catch (error) {
    console.error("Error checking username:", error);
    throw new Error("Internal server error");
  }
};
