import User from "../data/user.js";

export const loadePage = async (req, res, next) => {
  const username = req.user.username;
  const data = await User.findOne(
    { username: username },
    { expenses: 1, budget: 1, spending: 1, _id: 0 }
  );
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
    username: username,
    expenses: data.expenses,
    budget: data.budget,
    spending: data.spending,
  });
};