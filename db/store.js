// lets us use promises
const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");
const { parse } = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  // getting all the notes from the database
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote() {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Fields cannot be empty");
    }

    // Give note an id
    const newNote = {
      title,
      text,
      id: uuidv1(),
    };

    // Get all the notes in the array they are in
    // Once we have the notes array add the new note to that array
    // We-write newly updated array to the database
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
