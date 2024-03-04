const express = require('express');
const router = express.Router(); 
const DayModel = require('./Usermodel.js'); 
// GET route to fetch data
router.get('/getting', (req, res) => {
    res.json(data);
});

// POST route to add data
router.post('/', async (req, res) => {
    try {
        const newDay = req.body;
        const totalCount = await DayModel.countDocuments({});
        newDay.day = totalCount + 1; 
        const day = new DayModel(newDay);
        await day.save();
        res.json({ message: "New day added successfully", data: day });
    } catch (err) {
        console.error("Error adding new day:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
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

