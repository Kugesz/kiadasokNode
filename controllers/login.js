import __dirname from "../util/rootpath.js";
import path from "path";
import fs from "fs";

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

      jsonData.forEach((user) => {
        if (user.username == username) {
          if (user.password == password) {
            res.status(201).json({ message: "Good!", valid: true });
            return;
          }
          res.status(201).json({ message: "Not good!", valid: false });
          return;
        }
      });
      res.status(201).json({ message: "Not good!", valid: false });
    }
  );
};
