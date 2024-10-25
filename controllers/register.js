export const loadePage = (req, res, next) => {
  res.render("register.ejs", {
    pageTitle: "Regisztráció",
    path: "/",
    editing: false,
  });
};
