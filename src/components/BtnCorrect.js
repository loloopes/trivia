import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnCorrect extends Component {
  render() {
    const { correct } = this.props;
    return (
      <div>
        <button type="button" data-testid="correct-answer">{ correct }</button>
      </div>
    );
  }
}

BtnCorrect.propTypes = {
  correct: PropTypes.string.isRequired,
};
