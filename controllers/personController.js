const Persons = require('../models/personeModel');
const { getPostData } = require('../utils');

async function getPersons(req, res) {
  try {
    const persons = await Persons.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(persons));
  } catch (error) {
    console.log(error);
  }
}

async function getPerson(req, res, id) {
  try {
    const person = await Persons.findById(id);
    if (person) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(person));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createPerson(req, res, id) {
  try {
    const body = await getPostData(req);
    const newPerson = await Persons.create(JSON.parse(body));
    res.writeHead(201, { 'Content-Type': 'aplication/json' });
    return res.end(JSON.stringify(newPerson));
  } catch (error) {
    console.log(error);
  }
}

async function updatePerson(req, res, id) {
  try {
    const person = await Persons.findById(id);
    if (person) {
      const body = await getPostData(req);
      const updatePerson = await Persons.update(id, JSON.parse(body));
      res.writeHead(200, { 'Content-Type': 'aplication/json' });
      return res.end(JSON.stringify(updatePerson));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deletePerson(req, res, id) {
  try {
    const person = await Persons.findById(id);
    if (person) {
      await Persons.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mesaga: `Product ${id} removed` }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Person not found' }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
};
