import React from 'react';
// import styles from './Note.module.scss';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux';
import {setLocale} from 'react-redux-i18n';

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  setLanguage(identifier) {
    this.props.onSetLanguage(identifier);
  }

  render() {
    return(
      <div>
        <button onClick={() => this.setLanguage('en')}>EN</button>
        <button onClick={() => this.setLanguage('ru')}>RU</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);

