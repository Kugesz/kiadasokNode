if (process.env.NODE_ENV !== "production") {
  await import("dotenv").then((dotenv) => dotenv.config());
}

import path from "path";
import express from "express";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import methodOverride from "method-override";
import mongoose from "mongoose";

import __dirname from "./util/rootpath.js";
import index from "./routes/index.js";
import login from "./routes/login.js";
import register from "./routes/register.js";
import logout from "./routes/logout.js";

import * as users from "./data/user.js";

import initializePassport from "./configs/passport-config.js";

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

initializePassport(
  passport,
  (username) => {
    return users.Get().find((user) => user.username == username);
  },
  (id) => {
    return users.Get().find((user) => user.id == id);
  }
);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(
  session({
    secret: "asd123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/", index);
app.use("/login", login);
app.use("/register", register);
app.use("/logout", logout);

app.listen(PORT, () => {
  console.log(`server listens on port http://localhost:${PORT}`);
});
