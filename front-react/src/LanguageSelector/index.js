import React from 'react';
import styles from './Language.module.scss';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux';

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  setLanguage(identifier) {
    this.props.onSetLanguage(identifier);
  }

  render() {
    return(
      <div className={styles.languageContainer}>
        <div className={styles.languageBox}>
          <div className={styles.languageButton} onClick={() => this.setLanguage('ru')}></div>
          <div className={styles.languageButton} onClick={() => this.setLanguage('en')}></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);

