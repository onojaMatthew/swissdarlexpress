
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    setModal,
    modal,
    title,
    validationMsg,
    closeModal
  } = props;

  return (
    <div>
      {/* <Button color="danger" onClick={() => closeModal()}>{buttonLabel}</Button> */}
      <Modal isOpen={modal} toggle={() => setModal()} className={className}>
        <ModalHeader toggle={() => closeModal()}>{title}</ModalHeader>
        <ModalBody>
          {validationMsg}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => closeModal()}>Do Something</Button>{' '}
          <Button color="secondary" onClick={() => closeModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;