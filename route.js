const express = require('express');
const router = express.Router(); 
const DayModel = require('./Usermodel.js'); 

const jwt = require('jsonwebtoken')



router.post('/login',(req,res)=>{
    const secret = "siddhart"
    const token = jwt.sign({data:req.body},secret)
    console.log(token)
    res.send(token)
})

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
        newDay.id = totalCount + 1;
        const day = new DayModel(newDay);
        await day.save();
        res.json({ message: "New day added successfully", data: day });
    } catch (err) {
        console.error("Error adding new day:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT route to update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
        const updatedDay = await DayModel.findByIdAndUpdate(id, update, { new: true });
        if (updatedDay) {
            res.json({ message: `Day with id ${id} updated successfully`, data: updatedDay });
        } else {
            res.status(404).json({ error: `Day with id ${id} not found` });
        }
    } catch (err) {
        console.error("Error updating day:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// DELETE route to delete data
router.delete('/Delete-Entities/:id',(req,res)=>{
    const {id} = req.params
    DayModel.findByIdAndDelete({_id:id})
    .then(data=>res.json(data))
    .catch((err)=>res.json(err))
})

module.exports = router; // Export the router instance

