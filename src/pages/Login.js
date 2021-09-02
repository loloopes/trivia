import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getTokenThunk from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { getToken } = this.props;
    const { name, email } = this.state;
    getToken(name, email);
  }

  render() {
    const { name, email } = this.state;
    let handleButton = true;
    if (name && email) {
      handleButton = false;
    }
    return (
      <main>
        <form action="">
          <label htmlFor="input-player-name">
            Name:
            <input
              type="text"
              name="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-player-name">
            Email:
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/gameplay">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ handleButton }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: (name, email) => dispatch(getTokenThunk(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
