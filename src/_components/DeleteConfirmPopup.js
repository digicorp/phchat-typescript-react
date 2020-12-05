import React from "react";
import { Button, Modal, ModalBody } from "reactstrap";

class DeleteConfirmPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    //props received
    /*
		//variable
		confirmMessage		custom message
		openModal			flag to show/hide modal
		record_ids			comma separated list of IDs to be deleted

		//events
		cancelModal			onshow/onhide action
		*/
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete(e, is_delete = false) {
    this.props.cancelModal(false, is_delete, this.props.record_ids);
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.openModal}
          className="pmd-modal modal-dialog-centered delete-modal"
        >
          <ModalBody className="text-center">
            <i className="material-icons pmd-icon-md pmd-icon-circle bg-danger-light text-danger mb-4">
              delete
            </i>
            <h2>Are you sure?</h2>
            <p className="mb-4 px-md-4">
              When you delete this, you lose all domain-related details. This
              cannot be undone.
            </p>
            <div className="">
              <Button
                color="danger"
                className="btn-primary pmd-ripple-effect btn-modal-delete"
                onClick={e => this.confirmDelete(e, true)}
              >
                Delete
              </Button>
              <Button
                color="dark"
                className="pmd-btn-flat pmd-ripple-effect btn-modal-cancel"
                onClick={e => this.confirmDelete(e, false)}
              >
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export { DeleteConfirmPopup };
