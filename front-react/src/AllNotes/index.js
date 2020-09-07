import React from 'react';
import Note from '../Note';
import styles from './AllNotes.module.scss';

class AllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {notes: []};
  }

  componentDidMount() {
    fetch('http://localhost:3001/notes', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(response => {
        this.setState({
            notes: response.notes
          }
        );
      });
  }

  addNote(text, id) {
    this.setState({
      notes: [
        ...this.state.notes,
        { text, id }
      ],
    })
  }

  deleteNote(id) {
    let notes = this.state.notes.slice();
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        notes.splice(i, 1)
      }

      this.setState({notes})
    }
  }

  render() {
    return (
      <div className={styles.AllNotes}>
        <Note key="-1" addNote={(text, id) => this.addNote(text, id)} className={styles.AllNotes} target="add" />
        {
          this.state.notes.map( (item) => (
            <Note deleteNote={id => this.deleteNote(id)} key={item.id} target="edit" id={item.id} text={item.text}/>
          ))
        }
      </div>
    );
  }
}

export default AllNotes;
