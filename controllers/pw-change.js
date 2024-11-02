import bcrypt from "bcrypt";
import User from "../data/user.js";

// in body: password
export const changePassword = async (req, res, next) => {
  try {
    const username = req.user.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOne({ username: username }, { password: hashedPassword });

    //! Jo kerdes hogy ez mukodik kesobbiekben teszt szukseges
    req.logout();
    res.redirect("/login");
    res
      .status(201)
      .json({ message: "Your password change was successfull" })
      .redirect("/login");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "There was an error changin your password!",
        error: err,
      })
      .redirect("/");
  }
};
