
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./route'); // Import the router
const DayModel = require('./Usermodel.js');
const app = express();
app.use(express.json());
app.use(cors());

const config = {
    mongoURI: "mongodb+srv://Sid:Hello@cluster0.vxyjgk1.mongodb.net/?retryWrites=true&w=majority"
}

mongoose.connect(config.mongoURI, { dbName: "Web_list" })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Routes
app.get('/entities', async (req, res) => {
    try {
        const data = await DayModel.find({});
        res.json(data);
    } catch (err) {
        console.error("Error fetching data from database:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.use('/', route); // Use the router

app.listen(3000, () => {
    console.log('nodi api is running in the 3000 port');
});

