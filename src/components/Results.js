import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Results extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <main>
        <span>Placar: </span>
        <span
          data-testid="feedback-total-score"
        >
          {Number(score)}
        </span>
        <br />
        <span>Acertos: </span>
        <span data-testid="feedback-total-question">
          {assertions}
        </span>
      </main>
    );
  }
}

const mapStateToProps = ({ gameInfo: { assertions, score } }) => ({
  assertions,
  score,
});

Results.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Results);
