const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

const gameplayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + 1,
    };
  default:
    return state;
  }
};

export default gameplayReducer;
