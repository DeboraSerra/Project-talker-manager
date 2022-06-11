const validatePostName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ "message": "O campo \"name\" é obrigatório" });
  if (name.length < 3) return res.status(400).json({ "message": "O \"name\" deve ter pelo menos 3 caracteres" });
  next();
}

const validatePostAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json({ "message": "O campo \"age\" é obrigatório" });
  if (age < 18) return res.status(400).json({ "message": "A pessoa palestrante deve ser maior de idade" });
  next();
}

const validatePostTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ "message": "O campo \"talk\" é obrigatório" });
  const { rate } = talk;
  if (!rate) return res.status(400).json({ "message": "O campo \"rate\" é obrigatório" });
  const isValidRate = rate >= 1 && rate <= 5;
  if (!isValidRate) return res.status(400).json({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" });
  next();
}

const validateWatchDate = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) return res.status(400).json({ "message": "O campo \"watchedAt\" é obrigatório" });
  const isValidDate = watchedAt.match(/\d{2}\/\d{2}\/\d{4}/g);
  if (!isValidDate) return res.status(400).json({ "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\"" });
  next();
}

module.exports = {
  validatePostAge,
  validatePostName,
  validatePostTalk,
  validateWatchDate,
}
