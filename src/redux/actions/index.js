export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SET_SCORE = 'SET_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

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

export const getQuestionsThunk = (category,
  difficulty,
  type,
  token) => async (dispatch) => {
  if (category && difficulty && type) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`);
    const { results } = await response.json();
    dispatch(getQuestions(results));
  } else {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    dispatch(getQuestions(results));
  }
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
