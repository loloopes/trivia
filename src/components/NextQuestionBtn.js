import React from 'react';
import PropTypes from 'prop-types';

class NextQuestionBtn extends React.Component {
  render() {
    const { feat1, reset } = this.props;
    return (
      <div className="black2">
        <button
          className="btn submit-button btn-primary"
          onClick={ () => {
            feat1();
            reset();
          } }
          type="button"
          data-testid="btn-next"
        >
          Próxima
        </button>
      </div>
    );
  }
}

NextQuestionBtn.propTypes = {
  feat1: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default NextQuestionBtn;
