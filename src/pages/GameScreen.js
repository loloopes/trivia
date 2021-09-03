import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BtnCorrect from '../components/BtnCorrect';
import BtnWrong from '../components/BtnWrong';
import Header from '../components/Header';

import { getQuestionsThunk } from '../redux/actions';

class GameScreen extends React.Component {
  componentDidMount() {
    this.renderQuestions();
  }

  renderQuestions() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) {
      return <span>Carregando...</span>;
    }
    console.log(questions[0]);
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{questions[0].category}</h1>
        <p data-testid="question-text">{questions[0].question}</p>
        <BtnCorrect correct={ questions[0].correct_answer } />
        {questions[0].incorrect_answers.map((answer, index) => (<BtnWrong
          key={ index }
          wrong={ answer }
          index={ index }
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
