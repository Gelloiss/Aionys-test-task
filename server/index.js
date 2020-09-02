const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path');

app.get('/', (request, response) => {
  response.send(0);
})

app.get('/notes/:id?', (request, response) => { //Get notes
  let error = false;
  let result = {};
  const id = request.params.id;
  const notes = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'base', 'note.json')));
  if (id === undefined) { //get all notes
    result = {
      notes: notes,
      error: error
    };
  }

  else { //get note by id
    let note = '';
    if (Number.isInteger(parseInt(id))) {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
          note = notes[i];
          error = false;
          break;
        }
      }
      if (note.length == 0) {
        error = 'note does not exist';
      }
    }
    else {
      error = 'incorrect id';
    }
    result = {
      notes: [note],
      error: error
    };
  }
  response.send(JSON.stringify(result));
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})