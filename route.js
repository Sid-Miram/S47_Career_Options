const express = require('express');
const data = require('./Data.json');

const app = express();
app.use(express.json());

// GET request to retrieve all data
app.get('/', (req, res) => {
  res.json({ Data: data });
});

// POST request to add new data
app.post('/', (req, res) => {
  const newDay = req.body;
  const id = `id_${Object.keys(data).length + 1}`;
  data[id] = newDay;
  res.json({ id: id, message: "New day added successfully", data: newDay });
});

// PUT request to update existing data by id
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  if (data[id]) {
    data[id] = update;
    res.json({ message: `Day with id ${id} updated successfully`, data: data[id] });
  } else {
    res.status(404).json({ error: `Day with id ${id} not found` });
  }
});

// DELETE request to delete data by id
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (data[id]) {
    delete data[id];
    res.json({ message: `Day with id ${id} deleted successfully` });
  } else {
    res.status(404).json({ error: `Day with id ${id} not found` });
  }
});

// Listen function to start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
