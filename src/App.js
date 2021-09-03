import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import GameScreen from './pages/GameScreen';
import SettingsScreen from './pages/SettingsScreen';
import Ranking from './pages/Ranking';

import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gameplay" component={ GameScreen } />
        <Route exact path="/settings" component={ SettingsScreen } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
