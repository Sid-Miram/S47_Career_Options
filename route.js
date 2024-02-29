
const express = require('express');
const router = express.Router(); // Create a router instance
const data = require('./Data.json');

// GET route to fetch data
router.get('/getting', (req, res) => {
    res.json(data);
});

// POST route to add data
router.post('/', (req, res) => {
    const newDay = req.body;
    const id = `id_${Object.keys(data).length + 1}`;
    data[id] = newDay;
    res.json({ id: id, message: "New day added successfully", data: newDay });
});

// PUT route to update data
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    if (data[id]) {
        data[id] = update;
        res.json({ message: `Day with id ${id} updated successfully`, data: data[id] });
    } else {
        res.status(404).json({ error: `Day with id ${id} not found` });
    }
});

// DELETE route to delete data
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (data[id]) {
        delete data[id];
        res.json({ message: `Day with id ${id} deleted successfully` });
    } else {
        res.status(404).json({ error: `Day with id ${id} not found` });
    }
});

module.exports = router; // Export the router instance

