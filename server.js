require('dotenv').config();
const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/personController');

const server = http.createServer((req, res) => {
  const PATH = new RegExp(/\/person\/[a-zA-Z0-9]/);

  if (req.url === '/person' && req.method === 'GET') {
    getPersons(req, res);
  } else if (req.url.match(PATH) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    getPerson(req, res, id);
  } else if (req.url === '/person' && req.method === 'POST') {
    createPerson(req, res);
  } else if (req.url.match(PATH) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updatePerson(req, res, id);
  } else if (req.url.match(PATH) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deletePerson(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
