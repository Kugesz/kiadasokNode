import path from "path";
import express from "express";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import passport from "passport";
import methodOverride from "method-override";

import __dirname from "./util/rootpath.js";
import index from "./routes/index.js";
import login from "./routes/login.js";
import register from "./routes/register.js";

import User from "./models/user.js";

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

app.listen(PORT, () => {
  console.log(`server listens on port http://localhost:${PORT}`);
  User.load();
});
