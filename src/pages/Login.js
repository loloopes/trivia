import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, email } = this.state;
    let enableButton = true;
    if (name && email) {
      enableButton = false;
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
            <button type="button" data-testid="btn-play" disabled={ enableButton }>
              Jogar
            </button>
          </Link>
        </form>
      </main>
    );
  }
}

export default Login;
