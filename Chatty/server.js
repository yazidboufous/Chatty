// Require Mongoose and express 
const express = require('express');
const mongoose= require('mongoose');

//creating an express application
const app = express();

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1:27017";

//connect to the database and check for errors
mongoose.connect(mongoDB, {useNewUrlParser:true});
mongoose.connection.on('error', ()=>{
  console.log("There was a problem connection to Mongodb");
});


//define the schema of the message
var ChatMessageSchema = new mongoose.Schema({
  time: Number,
  alias: String,
  message: String
});

// Compile model from schema
var ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );


//retrieving messages after getting a get request and sending the records back
app.get('/chats', (req, res) => {

    let p1= ChatMessage.find({}).exec();

    p1.then ( (results) =>{
      res.send(results);
      console.log("sent sucessfully ")
    })

    p1.catch( (error) =>{
      console.log('failed to send chat',error);
    });
});

app.use(express.json());

//recieve the post request retrieve the data from the body and add item to the db 
app.post('/chats/post', (req, res) => {

    const data= req.body;

    // add to the database
    var newItem= new ChatMessage(
      {
        time: new Date(),
        alias:data.alias,
        message: data.message,
      }
    );
  
    let p= newItem.save();
    p.then(() => res.send('Saved successfully'));
    p.catch( (error) => { console.log('error saving item',error)});
});


//clearing the database after closing the web page
app.post('/drop_database', (req, res) => {
  mongoose.connection.db.dropDatabase();
});

//serve static files in public_html directory.
app.use(express.static('public_html'));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});



  




