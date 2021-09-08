import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RankingDiv from '../components/RankingDiv';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };

    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      ranking: rankingArray,
    });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.sort((playerA, playerB) => playerB.score - playerA.score)
          .map((player, index) => (
            <RankingDiv
              key={ index }
              index={ index }
              player={ player }
            />
          ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Volta para a tela inicial
          </button>
        </Link>
      </div>
    );
  }
}
export default Ranking;
