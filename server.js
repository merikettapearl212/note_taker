// Dependencies
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 1200;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// API Routes
app.get("/api/notes", function(req, res) {
  //Use the fs module tp read the file
  //THEN parse the file contents w/ JSON.parse() to real data
  //send the parsed data back to client with res.json()
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/about.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET route returns all saved notes
// app.get("/api/notes", function (req, res) {
//   return res.json(db);
// });
//POST route, create new note
//DELETE route, query parameter containing the id of a note to delete

// Listener
app.listen(PORT, function() {
  console.log("Aligator is listening on PORT" + PORT);
});