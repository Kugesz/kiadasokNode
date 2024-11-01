app.delete('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('session-id');
    res.redirect('/login');
  });
});