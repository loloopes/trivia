export const GET_TOKEN = 'GET_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

const getToken = (name, email, token) => ({
  type: GET_TOKEN,
  payload: {
    name,
    email,
    token,
  },
});

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
  },
});

export const getQuestionsThunk = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const { results } = await response.json();
  dispatch(getQuestions(results));
};

const getTokenThunk = (name, email) => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(getToken(name, email, data.token));
  localStorage.setItem('token', data.token);
};

export default getTokenThunk;
