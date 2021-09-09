import { GET_CATEGORIES, UPDATE_SETTINGS } from '../actions';

const INITIAL_STATE = {
  categories: [],
  category: '',
  difficulty: '',
  type: '',
};

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CATEGORIES:
    return { ...state, categories: action.payload.categories.trivia_categories };
  case UPDATE_SETTINGS:
    return {
      ...state,
      category: action.payload.category,
      difficulty: action.payload.difficulty,
      type: action.payload.type,
    };
  default:
    return state;
  }
};

export default settingsReducer;
