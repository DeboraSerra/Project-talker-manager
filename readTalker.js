const fs = require('fs').promises;

const readTalker = async () => {
  const file = await fs.readFile('./talker.json', 'utf-8');
  return file;
};

module.exports = readTalker;
