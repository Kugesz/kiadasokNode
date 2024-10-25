export const loadePage = (req, res, next) => {
  console.log("A controller lefutott!");
  res.render("login.ejs", {
    pageTitle: "Bejelentkezés",
    path: "/",
    editing: false,
  });
};
