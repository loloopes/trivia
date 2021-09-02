import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { gravatarEmail } = this.props;

    const mailToken = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="profile"
          src={`https://www.gravatar.com/avatar/${mailToken}`}
        />
        <p
          data-testid="header-player-name"
        >
          Nome da pessoa
        </p>
        <p
          data-testid="header-player-name"
        >
          Placar zerado
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ login: { gravatarEmail } }) => ({
  gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
