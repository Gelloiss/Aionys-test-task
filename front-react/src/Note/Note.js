import React from 'react';
import TextForm from "../TextForm/TextForm";
import styles from './Note.module.scss';

const Note = props => {
  return (
    <div className={styles.noteBlock}>
      <TextForm target={props.target}/>
    </div>
  )
}

export default Note;
