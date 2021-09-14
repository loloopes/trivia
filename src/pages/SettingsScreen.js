import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getCategoriesThunk, updateSettingsAction } from '../redux/actions';

class SettingsScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      category: '9',
      difficulty: 'easy',
      type: 'multiple',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  componentDidUpdate() {
    const { updateSettings } = this.props;
    const { category, difficulty, type } = this.state;
    updateSettings(category, difficulty, type);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { categories = [] } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title"> Settings </h1>
        <form action="" className="d-flex justify-content-evenly">
          <label htmlFor="category">
            Selecione a categoria:
            <select
              name="category"
              id="category"
              onChange={ this.handleChange }
              className="form-select"
            >
              {categories.map((category) => (
                <option key={ category.id } value={ category.id }>{category.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Selecione a dificuldade:
            <select
              name="difficulty"
              id="difficulty"
              onChange={ this.handleChange }
              className="form-select"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Selecione o tipo de respostas:
            <select
              name="type"
              id="type"
              onChange={ this.handleChange }
              className="form-select"
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </select>
          </label>
        </form>
        <br />
        <br />
        <Link to="/">
          <button type="button" className="buttonLogin btn btn-primary">
            Voltar para o login
          </button>
        </Link>
      </div>
    );
  }
}

SettingsScreen.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.settings.categories,
});

const mapDispatchProps = (dispatch) => ({
  fetchCategories: () => dispatch(getCategoriesThunk()),
  updateSettings: (category, difficulty, type) => dispatch(
    updateSettingsAction(category, difficulty, type),
  ),
});

export default connect(mapStateToProps, mapDispatchProps)(SettingsScreen);
