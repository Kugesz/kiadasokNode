import express from 'express';
const router = express.Router();

router.post('/change-password', (req, res) => {
  const { password } = req.body;

  // Itt adj hozzá kódot a jelszó titkosításához és mentéséhez az adatbázisban
  // bcrypt.hash(password, 10, (err, hashedPassword) => {
  //   if (err) return res.status(500).json({ success: false });
  //   // Tovább a jelszó mentéséhez az adatbázisban
  // });

  res.json({ success: true });
});

export default router;