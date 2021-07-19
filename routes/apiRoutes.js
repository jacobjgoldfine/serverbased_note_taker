const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const path = require("path");

function writeNotes(notes) {
  writeFileAsync(path.join(__dirname, "../db/db.json"), notes, (err) => {
    if (err) throw err;
    console.log("The note has been saved!");
  });
}

function readNotes() {
  readFileAsync(path.join(__dirname, "../db/db.json"), (err, notes) => {
    if (err) throw err;
    console.log(notes);
    return notes;
  });
}

module.exports = (app) => {
  app.get("/api/notes", async (req, res) => {
    const notes = await readNotes();
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    readNotes().then((notes) => {
      notes.push(req.body);
      writeNotes(notes);
      res.json(req.body);
    });
  });
};
