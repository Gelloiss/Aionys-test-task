import React, { Component } from 'react';
import styles from './Message.module.scss';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
  }

  setHide() {
    setTimeout(() => {
      this.props.setMessage('');
    }, 2000);
  }

  render() {
    if (this.props.message) {
      this.setHide();
      return (
        <div className={styles.Message}>
          {this.props.message}
        </div>
      )
    }
    else {
      return null;
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Message);