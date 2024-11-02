import bcrypt from "bcrypt";

// in body: password
export const changePassword = (req, res, next) => {
  const password = req.body.password;

  // Itt adj hozzá kódot a jelszó titkosításához és mentéséhez az adatbázisban
  // bcrypt.hash(password, 10, (err, hashedPassword) => {
  //   if (err) return res.status(500).json({ success: false });
  //   // Tovább a jelszó mentéséhez az adatbázisban
  // });

  res.status(201).json({ success: true });
};
