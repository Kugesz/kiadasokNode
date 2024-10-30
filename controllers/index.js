export const loadePage = (req, res, next) => {
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
  });
};

// Not working
export const newExpense = async (req, res, next) => {
  // username, expense
  const expense = {
    description: req.body.description,
    amount: req.body.amount,
    category: req.body.category,
  }
  await User.updateOne(
    { username: username },
    { $push: { expenses: expense } }
  );
};

export const deleteExpense = (req, res, next) => {};
