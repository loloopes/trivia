import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import questionsReducer from './questionsReducer';
import gameplayReducer from './gameplayReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  questionsReducer,
  gameInfo: gameplayReducer,
  settings: settingsReducer,
});

export default rootReducer;
