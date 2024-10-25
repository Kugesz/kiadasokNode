export const loadePage = (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Bejelentkezés",
    path: "/",
    editing: false,
  });
};