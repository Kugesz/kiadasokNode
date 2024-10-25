export const loadePage = (req, res, next) => {
  res.render("index.ejs", {
    pageTitle: "Kiadások",
    path: "/",
    editing: false,
  });
};
