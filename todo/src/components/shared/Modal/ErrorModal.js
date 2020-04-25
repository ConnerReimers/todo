import React from 'react';
import Button from '../Button';
import Modal from './Modal';

const ErrorModal = (props) => {
    return (
        <Modal
        header="An error ocurred..."
        footer="footer"
        show={!!props.error}
        cancel={props.clearError}
        footer={<Button class="modalBtn" btnContentClass="btnCON" onClick={props.clearError}>Ok...</Button>}

        >
          <p>{props.error}</p></Modal>
    )
}

export default ErrorModal
