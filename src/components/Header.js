import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;

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
        <p
          data-testid="header-score"
        >
          {`Score: ${score}`}
        </p>
        <p>
          {`Assertions: ${assertions}`}
        </p>

      </header>
    );
  }
}

const mapStateToProps = ({
  login: { gravatarEmail, name },
  gameInfo: { score, assertions },
}) => ({
  gravatarEmail,
  name,
  score,
  assertions,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
