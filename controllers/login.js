import __dirname from "../util/rootpath.js";
import passport from "passport";


export const loadePage = (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Bejelentkezés",
    path: "/",
    editing: false,
  });
};

export const loginCheck = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};
