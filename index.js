const express = require('express');
const bodyParser = require('body-parser');
const readTalker = require('./readTalker');

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

app.listen(PORT, () => {
  console.log('Online');
});
