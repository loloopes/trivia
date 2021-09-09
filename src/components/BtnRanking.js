import React, { Component } from 'react';

export default class BtnRanking extends Component {
  render() {
    return (
      <button
        className="btn btn-primary"
        data-testid="btn-ranking"
        type="button"
      >
        Ver Ranking
      </button>
    );
  }
}
