export const loadePage = (req, res, next) => {
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
  });
};

export const newExpense = (req, res, next) => {};

export const deleteExpense = (req, res, next) => {};
