import __dirname from "../util/rootpath.js";
import path from "path";
import fs from "fs";

import * as users from "../data/user.js";

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
    const hashedPassword = await bcrypt.hash(password, 2);
    users.Add({
      id: Date.now().toString(),
      username: username,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
};

const checkUsername = (username) => {
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON:", err);
        return;
      }

      const jsonData = JSON.parse(data);

      jsonData.forEach((user) => {
        if (user.username == username) {
          return false;
        }
      });

      return true;
    }
  );
};
