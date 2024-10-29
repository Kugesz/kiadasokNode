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

export const newRegister = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!checkUsername(username)) {
    async (req, res) => {
      try {
        const hashedPassword = await bycript.hash(req.body.password, 10);
        users.Add({
          id: Date.now().toString(),
          username: req.body.name,
          password: hashedPassword,
        });
        res.redirect("/login");
      } catch {
        res.redirect("/register");
      }
    };
  } else {
    res.status(400).json({ message: "Ez a felhasználónév már foglalt!" });
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
