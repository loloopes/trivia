import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import BtnCorrect from '../components/BtnCorrect';
import BtnWrong from '../components/BtnWrong';
import Header from '../components/Header';

import { getQuestionsThunk } from '../redux/actions';

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.renderQuestions();
  }

  renderQuestions() {
    const { token, fetchQuestions } = this.props;
    fetchQuestions(token);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <span>carregando</span>;
    }
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{ questions[0].category }</h1>
        <p data-testid="question-text">{ questions[0].question }</p>
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
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => {
    dispatch(getQuestionsThunk(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
