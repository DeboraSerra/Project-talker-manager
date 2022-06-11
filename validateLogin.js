const validateLoginEmail = (req, res, next) => {
  const { email } = req.body;
  // regex: https://regexr.com/3e48o
  if (!email) return res.status(400).json({ "message": "O campo \"email\" é obrigatório" });
  const isValid = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isValid) return res.status(400).json({ "message": "O \"email\" deve ter o formato \"email@email.com\"" });
  next();
}

const validateLoginPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ "message": "O campo \"password\" é obrigatório" });
  if (password.toString().length < 6) return res.status(400).json({ "message": "O \"password\" deve ter pelo menos 6 caracteres" });
  next();
}

module.exports = {
  validateLoginEmail,
  validateLoginPassword
}
