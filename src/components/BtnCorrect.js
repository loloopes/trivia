import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnCorrect extends Component {
  render() {
    const { correct, onClick, name } = this.props;
    return (
      <div>
        <button
          className="btn-correct"
          onClick={ onClick }
          type="button"
          data-testid="correct-answer"
          name={ name }
        >
          { correct }
        </button>
      </div>
    );
  }
}

BtnCorrect.propTypes = {
  correct: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
