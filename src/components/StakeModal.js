import { observer } from 'mobx-react';
import React from 'react';
import store from '../store';

const StakeModal = () => {
    return (<Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="amount-popup "
        show={store.show_amount_popup}
        onHide={() => {
            store.hideAmountPopup()
        }}
    >
        <Modal.Header closeButton>
            <Modal.Title>Deposit SUSHI Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
            <div className="text-right small">15,000 SUSHI available</div>
            <div>
                <input className="w-100 p-2 my-2" type="number" min="0" />
                <button className="btn btn-secondary btn-sm max-btn">MAX</button>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-light border col-6 mr-1">Cancel</button>
                <button className="btn btn-primary border col-6 ml-1">
                    Confirm
            </button>
            </div>
        </Modal.Body>
    </Modal>);
}

export default observer(StakeModal);