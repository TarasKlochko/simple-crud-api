const request = require('supertest');
const server = require('../server.js');
const DB = require('../data/persons.json');

const invalidID = '68952ce4-7727-4d6a-9943-9158faac527g';
const nonExistentID = '68952ce4-7727-4d6a-9943-9158faac527e';
const newPerson = {
  name: 'QW',
  age: 25,
  hobbies: 'programing',
};
const updatePerson = {
  name: 'QW',
  age: 25,
  hobbies: 'programing',
};
const newPersonInvalid = {
  name: 'QW',
  age: 25,
};

afterAll((done) => {
  server.close();
  done();
});

describe('Test all status code', () => {
  test('should return correct status code', async () => {
    await request(server).get('/persons').expect(200);

    const response = await request(server).post('/persons').send(newPerson).expect(201);

    await request(server).get(`/persons/${response.body.id}`).expect(200);
    await request(server).get(`/persons/${invalidID}`).expect(400);
    await request(server).get(`/persons/${nonExistentID}`).expect(404);

    await request(server).post('/persons').send(newPersonInvalid).expect(400);

    await request(server).put(`/persons/${response.body.id}`).send(updatePerson).expect(200);
    await request(server).put(`/persons/${invalidID}`).send(updatePerson).expect(400);
    await request(server).put(`/persons/${nonExistentID}`).send(updatePerson).expect(404);

    await request(server).delete(`/persons/${response.body.id}`).expect(204);
    await request(server).delete(`/persons/${invalidID}`).expect(400);
    await request(server).delete(`/persons/${nonExistentID}`).expect(404);
  });
});

describe('Test CRUD', () => {
  test('should create/read/update/delete person', async () => {
    await request(server)
      .get('/persons')
      .expect((res) => res.body === DB);

    const response = await request(server)
      .post('/persons')
      .send(newPerson)
      .expect((res) => res.body.name === newPerson.name);

    await request(server)
      .get(`/persons/${response.body.id}`)
      .expect(200, { id: response.body.id, name: 'QW', age: 25, hobbies: 'programing' });

    await request(server)
      .put(`/persons/${response.body.id}`)
      .send(updatePerson)
      .expect({ id: response.body.id, ...updatePerson });

    await request(server).delete(`/persons/${response.body.id}`).expect(204);
    await request(server).get(`/persons/${response.body.id}`).expect(404, { message: 'Person not found' });
  });
});

describe('Test all message', () => {
  test('should display all message', async () => {
    await request(server).get(`/people`).expect({ message: 'Route not found' });
    await request(server).get(`/persons/${nonExistentID}`).expect({ message: 'Person not found' });
    await request(server).get(`/persons/${invalidID}`).expect({ message: 'This code is not valid' });

    await request(server)
      .post('/persons')
      .send(newPersonInvalid)
      .expect({ message: 'Person must contain name, age and hobbies' });

    await request(server).put(`/persons/${nonExistentID}`).send(updatePerson).expect({ message: 'Person not found' });
    await request(server).put(`/persons/${invalidID}`).send(updatePerson).expect({ message: 'This code is not valid' });

    await request(server)
      .delete(`/persons/${nonExistentID}`)
      .send(updatePerson)
      .expect({ message: 'Person not found' });
    await request(server)
      .delete(`/persons/${invalidID}`)
      .send(updatePerson)
      .expect({ message: 'This code is not valid' });
  });
});
