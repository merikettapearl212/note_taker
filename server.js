// Dependencies
// ====================================================================
const express = require("express");
const path = require("path");
// require the "fs" module to import it
const fs = require("fs");
const { networkInterfaces } = require("os");
const realData = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))

// const nanoId = require("nanoid");

const app = express();
const PORT = process.env.PORT || 1200;

// Sets up the Express app to handle data parsing/ adding middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes
// ====================================================================
// API Routes
app.get("/api/notes", function(req, res) {
  // Use the fs module tp read the file
  // THEN .then() parse the file contents w/ JSON.parse() to read data 
  // Send the parsed data back to client with res.json()
  res.json(realData);

});

// app.get("/api/notes", function(req, res) {
//   fs.readFile(__dirname + "/db/db.json", "UTF8", (err, data) => (
//     if (err) throw (err);

//     let dataBase =  JSON.parse(data);
//     return res.json(dataBase);
//   ))
// });

app.get("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < realData.length; i++) {
    if (chosen === realData[i].id) {
      return res.json(realData[i]);
    }
  }

  return res.json(false);

});

// Creates new note
app.post("/api/notes", function(req, res) {
    // Access the POSTed data in req.body
    // use the fs module to read the file
    // Then parse the file contents with JSON.parse() to real data
    // Push the req.body to array list
    // JSON.stringify() the array list back into JSON string
    // Then save the contents back to the bd.json file w/ fs module
    var newNote = req.body
    var id = "newId" + realData.length
    newNote.id = id
    realData.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(realData), (err) => {
      if (err) throw (err)
      console.log("Look ma new notes-" + newNote.title);
    })
    return res.json(newNote);

});

// app.post("/api/notes", function (req, res) {
//   let newNote = {
//     title: req.body.title,
//     text: req.body.text,
//     id: nanoId()
//   };

//   fs.readFile(__dirname + "/db/db.json", "UTF8", (err, data) => {
//     if (err) throw (err)
    
//         let allNotes =  JSON.parse[data];
//         allNotes.push[newNote];
//         return res.json(allNotes);
//       });
// })

app.delete("/api/notes/:id", function(req, res) {
    // Access :id from req.params.id
    // Use the fs module to read the file
    // Then parse the file contents with JSON.parse() to the real data
    var newId = req.params.id
    var index = realData.findIndex( fullData => fullData.id === newId)
    realData.splice(index,1)
    fs.writeFile('./db/db.json', JSON.stringify(realData), (err) => {
      if (err) throw (err)
      console.log("I'm a deleted note!-" + req.params.id);
    })
    res.json(realData)
});



app.get("/notes", function(req, res) {
  // Return the contents of the notes.html
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
  // Return the contents of the index.html
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listener
app.listen(PORT, function() {
  console.log("Aligator is listening on PORT" + PORT);
});