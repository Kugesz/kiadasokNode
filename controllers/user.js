import User from "../data/user.js";
import bcrypt from "bcrypt";

export const getUserBudget = async (req, res, next) => {
  const username = req.user.username;
  try {
    const user = await User.findOne({ username: username });
    res.status(201).json({ budget: user.budget });
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error getting user budget!", error: err });
  }
};

export const getUserSpending = async (req, res, next) => {
  const username = req.user.username;
  try {
    const user = await User.findOne({ username: username });
    res.status(201).json({ spending: user.spending });
  } catch (err) {
    res.status(500).json({
      message: "There was an error getting user spending!",
      error: err,
    });
  }
};

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

const updateSpendings = async (user) => {
  console.log(user);
  try {
    const sum = user.expenses.reduce((sum, item) => sum + item.amount, 0);
    await User.updateOne({ username: user.username }, { spending: sum });
  } catch (err) {
    console.error(err);
  }
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

    const newUser = await User.findOneAndUpdate(
      { username: username },
      { $push: { expenses: expense } }
    );
    updateSpendings(newUser);
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
    const username = req.user.username;
    const expenseData = req.body.date;
    const newExpense = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };
    await User.findOneAndUpdate(
      { username: username, "expenses.date": expenseData },
      { $set: { "expenses.$": newExpense } },
      { new: false }
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

    await User.findOneAndUpdate(
      { username: username },
      { $pull: { expenses: expense } },
      { new: false }
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
  const username = req.user.username;
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
