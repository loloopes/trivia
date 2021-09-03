import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';
import gameplayReducer from './gameplayReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  questionsReducer,
  gameInfo: gameplayReducer,
});

export default rootReducer;
