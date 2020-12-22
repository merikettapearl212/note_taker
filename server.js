// Dependencies
const express = require("express");
const path = require("path");
// require the "fs" module to import it
const fs = require("fs");
const { notStrictEqual } = require("assert");

const app = express();
const PORT = process.env.PORT || 1200;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// API Routes
app.get("/api/notes", function(req, res) {
  // Use the fs module tp read the file
  // THEN .then() parse the file contents w/ JSON.parse() to real data 
  // Send the parsed data back to client with res.json()
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Creates new note
app.post("/api/notes", function(req, res) {
    // Access the POSTed data in req.body
    // use the fs module to read the file
    // Then parse the file contents with JSON.parse() to real data
    // Push the req.body to array list
    // JSON.stringify() the array list back into JSON string
    // Then save the contents back to the bd.json file w/ fs module
});

app.delete("/api/notes/:id", function(req, res) {
    // Access :id from req.params.id
    // Use the fs module to read the file
    // Then parse the file contents with JSON.parse() to the real data
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