import React from 'react';
import PropTypes from 'prop-types';

class NextQuestionBtn extends React.Component {
  render() {
    const { feat1, reset } = this.props;
    return (
      <button
        onClick={ () => {
          feat1();
          reset();
        } }
        type="button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }
}

NextQuestionBtn.propTypes = {
  feat1: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default NextQuestionBtn;
