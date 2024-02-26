const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')

const data = "mongodb+srv://Sid:Hello@cluster0.vxyjgk1.mongodb.net/?retryWrites=true&w=majority"

// define the ping route
app.get("/ping",(req,res)=>{
    res.send("pong")
})

app.get("/", (req, res)=> {
  mongoose.connect(data)
  .then(()=>{
      res.json({"Connection_Status" : "Connected"})
  .catch((err)=>{
          res.json({"Connection_Status" : "Not Connnected"})
        })
    })
})

app.all("*", (req,res,next) => {
  let err = new Error()
  err.status = `Can't find ${req.originalUrl} on the server`
  err.statusCode = 404;

  next(err);
})
// Error handling middleware for undefined webpages
app.use((error, req, res, next) => {
  
  res.status(500).send(error);
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
    console.log(`Click on this link to visit page(Ctrl+Click): http://localhost:${port}/ping`)
  });
}

module.exports = app;
