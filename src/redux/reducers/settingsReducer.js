import { GET_CATEGORIES } from '../actions';

const INITIAL_STATE = {
  categories: [],
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CATEGORIES:
    return { ...state, categories: action.payload.categories.trivia_categories };

  default:
    return state;
  }
};

export default settingsReducer;
