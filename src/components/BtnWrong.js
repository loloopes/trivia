import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BtnWrong extends Component {
  render() {
    const { wrong, index } = this.props;
    return (
      <div>
        <button type="button" data-testid={ `wrong-answer-${index}` }>
          {wrong}
        </button>
      </div>
    );
  }
}

BtnWrong.propTypes = {
  wrong: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
