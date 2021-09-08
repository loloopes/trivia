import React from 'react';
import PropTypes from 'prop-types';

class RankingDiv extends React.Component {
  render() {
    const { player, index } = this.props;
    return (
      <div>
        <img src={ player.picture } alt="" />
        <p data-testid={ `player-name-${index}` }>
          {player.name}
        </p>
        <p data-test-id={ `player-score-${index}` }>
          {player.score}
        </p>
      </div>
    );
  }
}

RankingDiv.propTypes = {
  player: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingDiv;
