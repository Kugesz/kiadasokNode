import User from "../data/user.js";

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
  try {
    const username = req.body.username;
    const expense = {
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
    };
    console.log(username, expense);

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

export const deleteExpense = async (req, res, next) => {
    // username, expense
    try {
      const username = req.body.username;
      const expense = {
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category,
      };
      console.log(username, expense);
  
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

