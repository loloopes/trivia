import React, { Component } from 'react';
import Header from '../components/Header';

export default class FeedBack extends Component {
  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text"> FeedbackScreen</p>
      </>
    );
  }
}
