import React from 'react';
import styles from './TextForm.module.scss';
import { Formik } from 'formik';

const TextForm = props => (
  <Formik
    initialValues = {{
      text: '',
      target: props.target
    }}
    onSubmit = {(values, { setSubmitting }) => {
      if (values.target == 'add') {
        let query = fetch('http://localhost:3000/notes', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({"text":values.text}),
        });
        const result = query.json();
        alert(result);
      }
    }}
  >
    {({
        handleChange,
        handleSubmit,
      }) => (
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="target"/>
        <textarea className={styles.text} name="text" onChange={handleChange}></textarea><br/>
        <button type="submit">
          Submit
        </button>
      </form>
    )}
  </Formik>
);

export default TextForm;
