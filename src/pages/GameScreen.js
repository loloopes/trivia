import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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
      answers: [],
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
    this.checkUpdate();
    this.setLocalStorage();
  }

  componentWillUnmount() {
    const { name, score, gravatarEmail } = this.props;
    const mailToken = md5(gravatarEmail).toString();
    let playersArray = [];
    const playerInfo = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${mailToken}`,
    };
    if (localStorage.getItem('ranking')) {
      playersArray = JSON.parse(localStorage.getItem('ranking'));
    }
    playersArray.push(playerInfo);
    localStorage.setItem('ranking', JSON.stringify(playersArray));
    this.resetBtn();
    // Link de referĂȘncia para armazenar array de ranking no Local Storage: https://pt.stackoverflow.com/questions/329223/armazenar-um-array-de-objetos-em-um-local-storage-com-js
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
    this.setState({
      timer: 30,
      answered: false,
    }, () => this.setTimer());
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
  }

  async renderQuestions() {
    const { category, difficulty, type, token, fetchQuestions } = this.props;
    await fetchQuestions(category, difficulty, type, token);
  }

  render() {
    const { questions } = this.props;
    const { timer, answered, qIndex } = this.state;
    if (questions.length === 0) {
      return <span>Carregando...</span>;
    }
    return (
      <div className="black2">
        <Header />
        <Timer timerCountdown={ timer } />
        <h1 data-testid="question-category">{questions[qIndex].category}</h1>
        <div className="quest-box">
          <p className="shadow-lg p-3 mb-5 bg-body question-text" data-testid="question-text">{questions[qIndex].question}</p>
        </div>
        <div>
          {questions[qIndex].sorted_answers.map((answer, index) => {
            if (questions[qIndex].correct_answer === answer) {
              return (
                <button
                  key={ answer }
                  className="btn-correct btn-primary btn"
                  type="button"
                  name="correct"
                  onClick={ this.handleClick }
                  disabled={ timer === 0 }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                className="btn-wrong btn-primary btn"
                key={ answer }
                type="button"
                name="wrong"
                onClick={ this.handleClick }
                disabled={ timer === 0 }
              >
                {answer}
              </button>
            );
          })}
        </div>
        {(answered || timer === 0)
        && <NextQuestionBtn feat1={ this.navQuest } reset={ this.resetBtn } />}
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.login.token,
  questions: state.questionsReducer.questions,
  gravatarEmail: state.login.gravatarEmail,
  name: state.login.name,
  score: state.gameInfo.score,
  assertions: state.gameInfo.assertions,
  category: state.settings.category,
  difficulty: state.settings.difficulty,
  type: state.settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (category, difficulty, type, token) => {
    dispatch(getQuestionsThunk(category, difficulty, type, token));
  },
  setScoreAction: (timer, difficulty) => {
    dispatch(setScore(timer, difficulty));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
