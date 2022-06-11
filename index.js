const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const readTalker = require('./readTalker');
const { validateLoginEmail, validateLoginPassword } = require('./validateLogin');
const token = require('./generateToken');
const validateToken = require('./validateToken');
const { validatePostAge, validatePostName, validatePostTalk, validateWatchDate } = require('./validateTalkerPost');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const response = await readTalker();
  const file = JSON.parse(response);
  res.status(200).json(file);
})

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const file = JSON.parse(await readTalker());
  const talker = file.find((t) => t.id === Number(id));
  if (!talker) return res.status(404).json({ "message": "Pessoa palestrante não encontrada" });
  res.status(200).json(talker);
})

app.post('/login',
  validateLoginEmail,
  validateLoginPassword,
  (req, res) => {
    res.status(200).json({ token: token() });
  }
)

app.use(validateToken);

app.post('/talker',
  validatePostAge,
  validatePostName,
  validatePostTalk,
  validateWatchDate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const file = JSON.parse(await readTalker());
    const id = file.length + 1;
    file.push({ id, name, age, talk });
    await fs.writeFile('./talker.json', JSON.stringify(file));
    res.status(201).json({ id, name, age, talk });
  }
)

app.listen(PORT, () => {
  console.log('Online');
});
