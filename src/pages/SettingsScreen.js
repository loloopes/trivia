import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCategoriesThunk } from '../redux/actions';

class SettingsScreen extends React.Component {
  componentDidMount() {
    const { fetchCategories } = this.props;
    fetchCategories();
  }

  render() {
    const { categories = [] } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title"> Settings </h1>
        <form action="">
          <label htmlFor="category">
            Selecione a categoria:
            <select name="category" id="category">
              {categories.map((category) => (
                <option key={ category.id } value={ category.id }>{category.name}</option>
              ))}
            </select>
          </label>
          <label htmlFor="difficulty">
            Selecione a dificuldade:
            <select name="difficulty" id="difficulty">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
          <label htmlFor="type">
            Selecione o tipo de respostas:
            <select name="type" id="type">
              <option value="multiple">Multiple Choice</option>
              <option value="true-false">True or False</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

SettingsScreen.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.settings.categories,
});

const mapDispatchProps = (dispatch) => ({
  fetchCategories: () => dispatch(getCategoriesThunk()),
});

export default connect(mapStateToProps, mapDispatchProps)(SettingsScreen);
