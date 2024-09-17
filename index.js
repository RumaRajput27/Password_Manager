const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
app.use(cors());
app.use(bodyParser.json());

let passwords = [];

// Endpoint to save a new password
app.post('/save-password', (req, res) => {
  const { title, password } = req.body;
  const newPassword = { id: uuidv4(), title, password };
  passwords.push(newPassword);
  res.status(201).send({ message: 'Password saved successfully' });
});

// Endpoint to get all passwords
app.get('/passwords', (req, res) => {
  res.status(200).json(passwords);
});

// Endpoint to update an existing password
app.put('/update-password/:id', (req, res) => {
  const { id } = req.params;
  const { title, password } = req.body;
  const passwordIndex = passwords.findIndex((entry) => entry.id === id);

  if (passwordIndex !== -1) {
    passwords[passwordIndex] = { id, title, password };
    res.status(200).send({ message: 'Password updated successfully' });
  } else {
    res.status(404).send({ message: 'Password not found' });
  }
});

// Endpoint to delete a password
app.delete('/delete-password/:id', (req, res) => {
  const { id } = req.params;
  passwords = passwords.filter((entry) => entry.id !== id);
  res.status(200).send({ message: 'Password deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
