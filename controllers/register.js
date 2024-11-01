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

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
    });
    await user.save();
    res.redirect("/login");
  } catch {
    if (error.code === 11000) { //Duplicated username
      throw new Error("Username or email already exists.");
    }
    res.redirect("/register");
  }
};