import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Results from '../components/Results';
import HeaderFback from '../components/HeaderFback';
import BtnRestart from '../components/BtnRestart';
import BtnRanking from '../components/BtnRanking';

import { resetScore as resetScoreAction } from '../redux/actions';

class FeedBack extends Component {
  componentWillUnmount() {
    const { resetScore } = this.props;
    resetScore();
  }

  render() {
    const { assertions } = this.props;
    const feedBack = 3;
    return (
      <>
        <HeaderFback />
        <Results />
        <p data-testid="feedback-text"> FeedbackScreen</p>
        { assertions < feedBack
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        <Link to="/">
          <BtnRestart />
        </Link>
        <Link to="ranking">
          <BtnRanking />
        </Link>
      </>
    );
  }
}

FeedBack.propTypes = {
  assertions: PropTypes.number.isRequired,
  resetScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.gameInfo.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
