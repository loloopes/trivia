import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BtnCorrect from '../components/BtnCorrect';
import BtnWrong from '../components/BtnWrong';
import Header from '../components/Header';
import Timer from '../components/Timer';
import NextQuestionBtn from '../components/NextQuestionBtn';

import { setScore, getQuestionsThunk } from '../redux/actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      answered: false,
      qIndex: 0,
    };

    this.setTimer = this.setTimer.bind(this);
    this.checkUpdate = this.checkUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.score = this.score.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.navQuest = this.navQuest.bind(this);
    this.resetBtn = this.resetBtn.bind(this);
  }

  componentDidMount() {
    this.renderQuestions();
    this.setTimer();
  }

  componentDidUpdate() {
    // const { score } = this.props;
    this.checkUpdate();
    this.setLocalStorage();
  }

  componentWillUnmount() {
    this.resetBtn();
  }

  setTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  setLocalStorage() {
    const { score, name, gravatarEmail, assertions } = this.props;
    // const { player } = this.state;
    // this.setState({
    const player = {
      player: {
        name,
        assertions,
        gravatarEmail,
        score,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  checkUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.interval);
    }
  }

  resetBtn() {
    document.querySelectorAll('.btn').forEach((btn) => { btn.style.border = ''; });
  }

  navQuest() {
    const quest = 4;
    const { history } = this.props;
    const { qIndex } = this.state;

    if (qIndex === quest) {
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      ...prevState,
      qIndex: prevState.qIndex + 1,
    }));
  }

  score(timer, difficulty) {
    const { setScoreAction } = this.props;
    setScoreAction(timer, difficulty);
  }

  handleClick(event) {
    const { timer, qIndex } = this.state;
    const { questions } = this.props;
    if (event.target.name === 'correct') {
      event.target.style.border = '3px solid rgb(6, 240, 15)';
      document.querySelectorAll('.btn-wrong').forEach((btn) => {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      });
      clearInterval(this.interval);
      this.score(timer, questions[qIndex].difficulty);
    } else if (event.target.name === 'wrong') {
      clearInterval(this.interval);
      document.querySelectorAll('.btn-wrong').forEach((btn) => {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      });
      document.querySelector('.btn-correct').style.border = '3px solid rgb(6, 240, 15)';
    }
    this.setState({
      answered: true,
    });
    this.setLocalStorage();
  }

  renderQuestions() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { questions } = this.props;
    const { timer, answered, qIndex } = this.state;
    if (questions.length === 0) {
      return <span>Carregando...</span>;
    }
    return (
      <div>
        <Header />
        <Timer timerCountdown={ timer } />
        <h1 data-testid="question-category">{questions[qIndex].category}</h1>
        <p data-testid="question-text">{questions[qIndex].question}</p>
        <BtnCorrect
          correct={ questions[qIndex].correct_answer }
          disable={ timer === 0 }
          onClick={ this.handleClick }
          name="correct"
        />
        {questions[0].incorrect_answers.map((answer, index) => (<BtnWrong
          name="wrong"
          onClick={ this.handleClick }
          key={ index }
          wrong={ answer }
          index={ index }
          disable={ timer === 0 }
        />))}
        {answered && <NextQuestionBtn feat1={ this.navQuest } reset={ this.resetBtn } />}
      </div>
    );
  }
}
GameScreen.propTypes = {
  token: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  setScoreAction: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,

};
const mapStateToProps = (state) => ({
  token: state.login.token,
  questions: state.questionsReducer.questions,
  gravatarEmail: state.login.gravatarEmail,
  name: state.login.name,
  score: state.gameInfo.score,
  assertions: state.gameInfo.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => {
    dispatch(getQuestionsThunk(token));
  },
  setScoreAction: (timer, difficulty) => {
    dispatch(setScore(timer, difficulty));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
