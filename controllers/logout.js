import express from 'express';
const router = express.Router();

router.delete('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/login');
  });
});

export default router;