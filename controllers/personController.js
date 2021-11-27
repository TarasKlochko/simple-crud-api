const Persons = require('../models/personeModel');
const { getPostData } = require('../utils');
const { version: uuidVersion } = require('uuid');
const { validate: uuidValidate } = require('uuid');

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
    const isUuidV4Valid = uuidValidate(id) && uuidVersion(id) === 4;
    if (isUuidV4Valid) {
      const person = await Persons.findById(id);
      if (person) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(person));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person not found' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: ' This code is not valid ' }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createPerson(req, res, id) {
  try {
    const body = await getPostData(req);
    const person = JSON.parse(body);
    let isValidPerson = 'name' in person && 'age' in person && 'hobbies' in person;
    if (isValidPerson) {
      const newPerson = await Persons.create(JSON.parse(body));
      res.writeHead(201, { 'Content-Type': 'aplication/json' });
      return res.end(JSON.stringify(newPerson));
    } else {
      res.writeHead(400, { 'Content-Type': 'aplication/json' });
      return res.end(JSON.stringify({ message: 'Person must contain name, age and hobbies' }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function updatePerson(req, res, id) {
  try {
    const isUuidV4Valid = uuidValidate(id) && uuidVersion(id) === 4;
    if (isUuidV4Valid) {
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
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: ' This code is not valid ' }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deletePerson(req, res, id) {
  try {
    const isUuidV4Valid = uuidValidate(id) && uuidVersion(id) === 4;
    if (isUuidV4Valid) {
      const person = await Persons.findById(id);
      if (person) {
        await Persons.remove(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ messaga: `Person ${id} removed` }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Person not found' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: ' This code is not valid ' }));
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
