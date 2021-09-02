export const GET_TOKEN = 'GET_TOKEN';

const getToken = (name, email, token) => ({
  type: GET_TOKEN,
  payload: {
    name,
    email,
    token,
  },
});

const getTokenThunk = (name, email) => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  dispatch(getToken(name, email, data.token));
  localStorage.setItem('token', data.token);
};

export default getTokenThunk;
