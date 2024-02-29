
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./route'); // Import the router
const app = express();
app.use(express.json());
app.use(cors());

const config = {
    mongoURI: "mongodb+srv://Sid:Hello@cluster0.vxyjgk1.mongodb.net/?retryWrites=true&w=majority"
}

app.get('/ping', (req, res) => {
    mongoose.connect(config.mongoURI)
        .then(() => {
            res.send("Connection is done.")
        })
        .catch(() => {
            res.send("Not connected")
        })
});

app.use('/', route); // Use the router

app.listen(3000, () => {
    console.log('nodi api is running in the 3000 port');
});

