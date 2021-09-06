import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnCorrect extends Component {
  render() {
    const { correct, onClick, name, disable } = this.props;
    return (
      <div>
        <button
          className="btn-correct btn"
          onClick={ onClick }
          type="button"
          disabled={ disable }
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
  disable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
