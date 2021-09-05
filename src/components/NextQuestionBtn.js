import React from 'react';

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

export default NextQuestionBtn;
