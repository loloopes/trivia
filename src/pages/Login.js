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
    this.renderInputs = this.renderInputs.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { getToken } = this.props;
    const { name, email } = this.state;
    getToken(name, email);
  }

  renderInputs() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name" className="display-container">
          Name:
          <input
            className="login form-control white"
            type="text"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-player-name" className="display-container">
          Email:
          <input
            className="login form-control white "
            type="text"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  render() {
    const { name, email } = this.state;
    let handleButton = true;
    if (name && email) {
      handleButton = false;
    }
    return (
      <main>
        <form action="" className="display-container black forms">
          {this.renderInputs()}
          <div className="start_btns">
            <Link to="/gameplay">
              <button
                className="buttonLogin btn btn-primary display-container"
                type="button"
                data-testid="btn-play"
                disabled={ handleButton }
                onClick={ this.handleClick }
              >
                Jogar
              </button>
            </Link>

            <Link to="/settings">
              <button
                className="btn submit-button btn-primary display-container"
                type="button"
                data-testid="btn-settings"
              >
                Configura????es
              </button>
            </Link>

          </div>

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
