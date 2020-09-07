import React, { Component } from 'react';
import Note from '../Note';
import styles from './AllNotes.module.scss';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux';
import LanguageSelector from '../LanguageSelector';
import Message from "../Message";


class AllNotes extends Component {
  constructor(props) {
    super(props);
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
        this.props.onNotesAdd(response.notes);
      });
  }

  addNote(text, id) {
    this.props.onNoteAdd(id, text);
  }

  deleteNote(id) {
    this.props.onNoteDelete(id);
  }

  setMessage(text) {
    this.props.onMessage(text);
  }

  render() {
    return (
      <div className={styles.AllNotes}>
        <Message setMessage={text => this.setMessage(text)} message={text => this.showMessage(text)} />
        <LanguageSelector />
        <Note key="-1" addNote={(text, id) => this.addNote(text, id)} className={styles.AllNotes} target="add" />
        {
          this.props.notes.map( (item) => (
            <Note setMessage={text => this.setMessage(text)} deleteNote={id => this.deleteNote(id)} key={item.id} target="edit" id={item.id} text={item.text}/>
          ))
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);
