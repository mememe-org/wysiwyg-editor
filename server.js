const express = require('express');
const bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectId; 
var mongojs = require('mongojs');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function connect_db_user(username){
    var databaseUrl = 'mememe';
    var collections = [username];
    var db = mongojs(databaseUrl, collections);
    module.exports = {
        connect: db
    };
};



// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//Home
app.get('/api/:username', (req, res) => {
  usernamenaka=req.params.username
  connect_db_user(usernamenaka)
   // drop database collection
  //db.users.drop()
  db.usernamenaka.find(function(err,docs){
    console.log(docs)
    res.send(docs)
  });
});

//Create
app.post('/api/:username',(req,res)=>{
    usernamenaka=req.params.username
    connect_db_user(usernamenaka)
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
    usernamenaka=req.params.username
    connect_db_user(usernamenaka)
    console.log("remove id: "+ObjectId(req.params.memeid))
    var mq={_id:ObjectId(req.params.memeid)}
    db.usernamenaka.remove(mq)
});
