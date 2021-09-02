import { GET_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  token: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default loginReducer;
