export const loadePage = (req, res, next) => {
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
  });
};

export const newExpense = async (req, res, next) => {
  // username, expense
  await User.updateOne(
    { username: username },
    { $push: { expenses: expense } }
  );
};

export const deleteExpense = (req, res, next) => {};
