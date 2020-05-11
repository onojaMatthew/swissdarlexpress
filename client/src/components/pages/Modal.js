
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

const ModalTemplate = (props) => {
  const {
    setModal,
    modal,
    single,
  } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal()}>
        <ModalHeader toggle={() => setModal(false)}>Pre Alert to Approve</ModalHeader>
        <ModalBody>
          <Table className="hovered">
            <thead>
              <tr>
                <th>Company name</th>
                <th>Email</th>
                <th>Tracking number</th>
                <th>Status</th>
                <th>Phone</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {single[0] && single[0].companyName}
                </td>
                <td>
                  {single[0] && single[0].email}
                </td>
                <td>
                  {single[0] && single[0].trackingNumber}
                </td>
                <td>
                  {single[0] && single[0].status}
                </td>
                <td>
                  {single[0] && single[0].phone}
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalTemplate;