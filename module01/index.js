const express = require('express');
const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
//Request body=  { "name": "Talison", "email": "talisonmaturana@ibm.com" }

//CRUD - Create, Read, Update, Delete

const users = ['Talison', 'Ivan', 'Amanda'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Method: ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd('Request');

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exists' });
  }
  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(port, () => console.log(`Server is running ou port ${port}`));
