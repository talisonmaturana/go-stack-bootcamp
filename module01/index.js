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
  console.log(`Method: ${req.method}; URL: ${req.url};`);

  return next();
});

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  let { index } = req.params;
  return res.json(users[index]);
});

server.post('/users', (req, res) => {
  let { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', (req, res) => {
  let { index } = req.params;
  let { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', (req, res) => {
  let { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

server.listen(port, () => console.log(`Server is running ou port ${port}`));
