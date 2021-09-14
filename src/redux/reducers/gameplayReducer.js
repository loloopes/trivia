import { RESET_SCORE, SET_SCORE, SET_SORT_ANSWERS } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  answers: [],
};

const calcScore = (action, state) => {
  const easy = 'easy';
  const medium = 'medium';
  const hard = 'hard';
  const pt1 = 1;
  const pt2 = 2;
  const pt3 = 3;
  const pt = 10;
  switch (action.payload.difficulty) {
  case easy: return (state.score + (pt + (action.payload.timer * pt1)));
  case medium: return (state.score + (pt + (action.payload.timer * pt2)));
  case hard: return (state.score + (pt + (action.payload.timer * pt3)));
  default: return state.score;
  }
};

const gameplayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: calcScore(action, state),
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case SET_SORT_ANSWERS:
    return {
      ...state,
      answers: action.payload.answers,
    };
  default:
    return state;
  }
};

export default gameplayReducer;
