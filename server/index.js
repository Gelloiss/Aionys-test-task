const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
app.use(bodyParser.json({extended: true}));
app.use(cors({origin:'*'}));
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

const getNotePosition = (notes, search) => {
  let result = -1;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == search) {
      result = i;
      break;
    }
  }
  return result;
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
      notes,
      error
    };
  }

  else { //get note by id
    let note = '';
    if (Number.isInteger(parseInt(id))) {
      const position = getNotePosition(notes, id);
      if (position != -1) {
        note = notes[position];
        error = false;
      }
      else {
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

app.post('/notes', (request, response) => { //Add new note
  let notes = getBase();
  let i = getBase('increment.json').note;
  i++;
  notes.push({
    'id':i,
    'text':request.body.text
  });
  setBase('note.json', notes);
  setBase('increment.json', {'note':i});
  response.send({"id":i});
});

app.put('/notes/:id', (request, response) => { //update base
  const id = request.params.id;
  let error = false;
  const notes = getBase();
  if (Number.isInteger(parseInt(id))) {
    const position = getNotePosition(notes, request.params.id);
    if (position != -1) {
      notes[position].text = request.body.text;
      setBase('note.json', notes);
    }
    else {
      error = 'note does not exist';
    }
  }
  else {
    error = 'incorrect id';
  }
  result = {
    error
  };
  response.send(JSON.stringify(result));
});

app.delete('/notes/:id', (request, response) => { //delete note
  const notes = getBase();
  if (Number.isInteger(parseInt(request.params.id))) {
    const position = getNotePosition(notes, request.params.id);
    if (position != -1) {
      notes.splice(position, 1);
      setBase('note.json', notes);
      error = false;
    }
    else {
      error = 'note does not exist';
    }
  }
  else {
    error = 'incorrect id';
  }
  result = {
    error
  };
  response.send(result);
});

app.listen(port,(err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});
