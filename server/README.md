# Installing the server

1. Open folder with this project
2. Execute `npm install`
3. To run app, execute `npm start`
4. This app wil be in http://localhost:3001/

## Avalible methods

1. Get all notes

    Execute http get query http://localhost:3001/notes
    
    You will get a json string with parameters 'notes' (array of notes) and 'error'.
    
    Parameter 'error' will contain false or error message.
    
    e.g. `{"notes":[{"id":20,"text":"example"},"error":false}`
    
2. Get note by id

    Execute http get query http://localhost:3001/notes/id, where id - note id
    
    example: [http://localhost:3001/notes/1](http://localhost:3001/notes/1)
    
    You will get a json string with parameters 'notes' (array of notes) and 'error'.
        
    Parameter 'error' will contain false or error message.
        
    e.g. `{"notes":[{"id":20,"text":"example"},"error":false}` or `{"notes":[""],"error":"note does not exist"}`
    
3. Add new note

    Execute http post query http://localhost:3001/notes and send header `'Content-Type': 'application/json'` also body that contains the json string with parameter `text` (e.g. {"text":"the text of your note"})
    
    You will get a json string with parameters 'id' which will contain the id of the added note.
    
4. Update note
    Execute http put query http://localhost:3001/notes/id, where id - note id. You need send header `'Content-Type': 'application/json'` also body that contains the json string with parameter `text` (e.g. {"text":"the new text of your note"})
    
    You will get a json string with parameters 'error' which will contain error message or false.
    
5. Delete note

    Execute http delete query http://localhost:3001/notes/id, where id - note id
    
    You will get a json string with parameters 'error' which will contain error message or false.
