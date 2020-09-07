import React from 'react';
import styles from './Note.module.scss';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.text, edit: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submit(target, text, id = null) { //add and update requests
    if (target === 'add') {
      fetch('http://localhost:3001/notes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"text":text})
      }).then(response => response.json())
        .then(response => {
          this.props.addNote(text, response.id);
          this.setState({"value":''});
        })
    }

    if (target === 'edit') {
      fetch(`http://localhost:3001/notes/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"text":text})
      })
    }
  }

  delete(id) { //delete request
    fetch(`http://localhost:3001/notes/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    }).then(() => this.props.deleteNote(id))
  }

  render() {
    if (this.props.target === 'add') {
      return (
        <div className={styles.noteBlock}>
          <textarea placeholder="enter the text" className={styles.textField} value={this.state.value} onChange={this.handleChange} />
          <div className={styles.buttonsBlock}>
            <button onClick={() => this.submit(this.props.target, this.state.value)}>Submit</button>
          </div>
        </div>
      )
    }

    if (this.state.edit) {
      return (
        <div className={styles.noteBlock}>
          <textarea onBlur={() => this.setState({edit: false})} autoFocus className={styles.textField} value={this.state.value} onChange={this.handleChange} />
          <div className={styles.buttonsBlock}>
            <button onMouseDown={() => this.submit(this.props.target, this.state.value, this.props.id)}>Submit</button>
            <button onMouseDown={() => this.delete(this.props.id)}>Delete</button>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.noteBlock}>
        <p onClick={() => this.setState({edit: true, value: this.state.value})} className={styles.text}>{this.state.value}</p>
      </div>
    )
  }
}

export default Note;
