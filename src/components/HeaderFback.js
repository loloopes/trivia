import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class HeaderFback extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;

    const mailToken = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={ `https://www.gravatar.com/avatar/${mailToken}` }
        />
        <p
          data-testid="header-player-name"
        >
          {`Player: ${name}`}
        </p>
        <span>Header Score:</span>
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = ({
  login: { gravatarEmail, name },
  gameInfo: { score },
}) => ({
  gravatarEmail,
  name,
  score,
});

HeaderFback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(HeaderFback);
