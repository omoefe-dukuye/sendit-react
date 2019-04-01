import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Modal extends Component {
  componentDidMount () {
    document.addEventListener('click', this.handleToggle);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleToggle);
  }

  handleToggle = ({ target }) => {
    if (this.modal.contains(target)) return;

    this.props.hideModal();
  };

  render() {
    const { content } = this.props;

    return (
      <div className="modal__background">
        <div className="modal__modal" ref={node => this.modal = node}>
          {content}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.object,
  hideModal: PropTypes.func
};

export default Modal;
