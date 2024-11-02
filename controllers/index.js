import User from "../data/user.js";

export const loadePage = async (req, res, next) => {
  const username = req.user.username;
  const expenses = await User.findOne(
    { username: username },
    { expenses: 1, _id: 0 }
  );
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
    username: username,
    expenses: expenses,
  });
};

// in body: description, amount, category
export const newExpense = async (req, res, next) => {
  try {
    const username = req.user.username;
    const expense = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };

    await User.updateOne(
      { username: username },
      { $push: { expenses: expense } }
    );
    res.status(201).json({ message: "Expense added successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating expense!" });
  }
};

// search by: Date
// in body: description, amount, category
export const editExpense = async (req, res, next) => {
  try {
    const username = req.body.username;
    const expenseData = req.body.date;
    const newExpense = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };
    await User.updateOne(
      { username: username, "expenses.date": expenseData },
      { $set: { "expenses.$": newExpense } }
    );
    res.status(201).json({
      message: "Expense edited successfully!",
      error: err,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while editing expense!",
      error: err,
    });
  }
};

// in body: description, amount, category
export const deleteExpense = async (req, res, next) => {
  try {
    const username = req.user.username;
    const expense = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };

    await User.updateOne(
      { username: username },
      { $pull: { expenses: expense } }
    );
    res.status(201).json({ message: "Expense added successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating expense!" });
  }
};

// in body: budget
export const setBudget = async (req, res, next) => {
  const username = req.body.username;
  const budget = req.body.budget;
  try {
    await User.updateOne({ username: username }, { $set: { budget: budget } });
    res.status(201).json({ message: "Budget set successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while setting budget!", error: err });
  }
};
