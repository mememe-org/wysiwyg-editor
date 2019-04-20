const express = require('express');
const bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectId; 
var mongojs = require('mongojs');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var database = 'mememe';

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//Home
app.get('/api/:username', (req, res) => {
  var usernamenaka=req.params.username
  var db = mongojs(database, [usernamenaka]);
  module.exports = {connect: db };
   // drop database collection
  //db.usernamenaka.drop()
  db.usernamenaka.find(function(err,docs){
    console.log(docs)
    res.send(docs)
  });
});

//Create
app.post('/api/:username',(req,res)=>{
  var usernamenaka=req.params.username
  var db = mongojs(database, [usernamenaka]);
    db.usernamenaka.find(function(err,docs){
    console.log(docs.length)
    var newmeme={
      text: req.body.text
    }
    console.log(newmeme)
    db.usernamenaka.insert(newmeme)
  });
});

//Remove
app.get('/api/:username/:memeid', (req, res) => {
  var usernamenaka=req.params.username
  var db = mongojs(database, [usernamenaka]);
    console.log("remove id: "+ObjectId(req.params.memeid))
    var mq={_id:ObjectId(req.params.memeid)}
    db.usernamenaka.remove(mq)
});
