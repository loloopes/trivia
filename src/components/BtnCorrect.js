import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnCorrect extends Component {
  render() {
    const { correct, onClick, name, disable } = this.props;
    return (
      <button
        className="btn-correct btn-primary btn"
        onClick={ onClick }
        type="button"
        disabled={ disable }
        data-testid="correct-answer"
        name={ name }
      >
        { correct }
      </button>

    );
  }
}

BtnCorrect.propTypes = {
  correct: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
