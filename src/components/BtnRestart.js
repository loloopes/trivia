import React, { Component } from 'react';

export default class BtnRestart extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
      >
        Jogar Novamente
      </button>
    );
  }
}
