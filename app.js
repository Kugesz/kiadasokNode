import path from "path";
import express from "express";
import bodyParser from "body-parser";

import login from "./routes/login.js";
import register from "./routes/register.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/login", login);
app.use("/register", register);

app.listen(PORT, () => {
  console.log(`server listens on port http://localhost:${PORT}`);
});
