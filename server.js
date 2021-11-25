const http = require('http');
const { getPersons, getPerson, createPerson, updatePerson, deletePerson } = require('./controllers/personController');

const server = http.createServer((req, res) => {
  if (req.url === '/persons' && req.method === 'GET') {
    getPersons(req, res);
  } else if (req.url.match(/\/persons\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[2];
    console.log(id);
    getPerson(req, res, id);
  } else if (req.url === '/persons' && req.method === 'POST') {
    createPerson(req, res);
  } else if (req.url.match(/\/persons\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[2];
    updatePerson(req, res, id);
  } else if (req.url.match(/\/persons\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[2];
    deletePerson(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
