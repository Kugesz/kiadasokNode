import __dirname from "../util/rootpath.js";
import path from "path";
import fs from "fs";

import bcrypt from 'bcrypt';

export const loadePage = (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Bejelentkezés",
    path: "/",
    editing: false,
  });
};

export const loginCheck = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON:", err);
        return;
      }

      const jsonData = JSON.parse(data);

      let sent = false;

      const user = jsonData.find(user => user.username == username);
      if(user == null){
        return res.status(201).json({ message: "Not good!", valid: false });
      }
      if (bcrypt.compare(user.password, password)) {
        return res.status(201).json({ message: "Good!", valid: true });
      }
      return res.status(201).json({ message: "Not good!", valid: false });
    }
  );
};
