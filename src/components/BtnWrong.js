import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnWrong extends Component {
  render() {
    const { wrong, index, name, onClick } = this.props;
    return (
      <div>
        <button
          className="btn-wrong"
          name={ name }
          onClick={ onClick }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          {wrong}
        </button>
      </div>
    );
  }
}

BtnWrong.propTypes = {
  wrong: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
