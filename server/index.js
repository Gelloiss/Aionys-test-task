const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.raw({extended: true}));
const fs = require('fs');
const path = require('path');

/*FUNCTIONS*/
const getBase = (file = 'note.json') => {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'base', file)));
}

const setBase = (file, data) => {
  fs.writeFileSync((path.resolve(__dirname, 'base', file)), JSON.stringify(data));
  return true;
}

/*ROUTING*/
app.get('/', (request, response) => {
  response.send(0);
});

app.get('/notes/:id?', (request, response) => { //Get notes
  let error = false;
  let result = {};
  const id = request.params.id;
  const notes = getBase();
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
});

app.post('/notes', (request, response) => {
  let notes = getBase();
  let i = getBase('increment.json').note;
  i++;
  notes.push({
    'id':i,
    'text':request.body.text
  });
  setBase('note.json', notes);
  setBase('increment.json', {'note':i});
  response.send(true);
});

app.listen(port,(err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});