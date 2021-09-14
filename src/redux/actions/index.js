import fetchQuestions from '../../services/fetchQuestions';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_SCORE = 'SET_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const SET_SORT_ANSWERS = 'SET_SORT_ANSWERS';

const getToken = (name, email, token) => ({
  type: GET_TOKEN,
  payload: {
    name,
    email,
    token,
  },
});

export const setScore = (timer, difficulty) => ({
  type: SET_SCORE,
  payload: {
    timer,
    difficulty,
  },
});

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
  },
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

const getCategories = (categories) => ({
  type: GET_CATEGORIES,
  payload: {
    categories,
  },
});

export const updateSettingsAction = (category, difficulty, type) => ({
  type: UPDATE_SETTINGS,
  payload: {
    category,
    difficulty,
    type,
  },
});

const setSortAnswers = (answers) => ({
  type: SET_SORT_ANSWERS,
  payload: {
    answers,
  },
});

export const sortAnswersThunk = () => (dispatch, getState) => {
  const { questionsReducer: { questions } } = getState();
  const answers = [questions[0].correct_answer,
    ...questions[0].incorrect_answers];
  for (let i = answers.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = answers[i];
    answers[i] = answers[j];
    answers[j] = temp;
  }
  console.log(answers);
  dispatch(setSortAnswers(answers));
};

export const getQuestionsThunk = (category,
  difficulty,
  type,
  token) => async (dispatch) => {
  const results = await fetchQuestions(category, difficulty, type, token);
  dispatch(getQuestions(results));
};

const getTokenThunk = (name, email) => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(getToken(name, email, data.token));
  localStorage.setItem('token', data.token);
};

export const getCategoriesThunk = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  dispatch(getCategories(data));
};

export default getTokenThunk;
