const fs = require("fs");
const path = require("path");

function writeNotes(notes) {
  return fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes), (err) => {
    if (err) throw err;
    console.log("The note has been saved!");
  });
}
function readNotes() {
  return fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
}
module.exports = (app) => {
  app.get("/api/notes", async (req, res) => {
    const notes = await JSON.parse(readNotes());
    res.json(notes);
  });
  app.post("/api/notes", async (req, res) => {
    const notes = await JSON.parse(readNotes());
    notes.push(req.body);
    writeNotes(notes);
    res.json(req.body);
  });
};
