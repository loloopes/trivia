import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { timerCountdown } = this.props;
    return (
      <p>
        { timerCountdown }
      </p>
    );
  }
}

Timer.propTypes = {
  timerCountdown: PropTypes.number.isRequired,
};

export default Timer;
