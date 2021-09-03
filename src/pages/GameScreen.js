import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BtnCorrect from '../components/BtnCorrect';
import BtnWrong from '../components/BtnWrong';
import Header from '../components/Header';
import Timer from '../components/Timer';

import { getQuestionsThunk } from '../redux/actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
    };
    this.setTimer = this.setTimer.bind(this);
    this.checkUpdate = this.checkUpdate.bind(this);
  }

  componentDidMount() {
    this.renderQuestions();
    this.setTimer();
  }

  componentDidUpdate() {
    this.checkUpdate();
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  checkUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.interval);
    }
  }

  renderQuestions() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { questions } = this.props;
    const { timer } = this.state;
    if (questions.length === 0) {
      return <span>Carregando...</span>;
    }
    return (
      <div>
        <Header />
        <Timer timerCountdown={ timer } />
        <h1 data-testid="question-category">{questions[0].category}</h1>
        <p data-testid="question-text">{questions[0].question}</p>
        <BtnCorrect
          correct={ questions[0].correct_answer }
          disable={ timer === 0 }
        />
        {questions[0].incorrect_answers.map((answer, index) => (<BtnWrong
          key={ index }
          wrong={ answer }
          index={ index }
          disable={ timer === 0 }
        />))}
      </div>
    );
  }
}

GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
  questions: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => {
    dispatch(getQuestionsThunk(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
