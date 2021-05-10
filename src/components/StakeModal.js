import React from 'react';
import { Modal } from 'react-bootstrap';

const StakeModal = ({ show, title, onClose, onConfirm, amount, symbol, inputAmount, setInputAmount, onMax }) => {
    return (<Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="amount-popup "
        show={show}
        onHide={onClose}
    >
        <Modal.Header closeButton>
            <Modal.Title>{title} {symbol} Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
            <div className="text-right small">{amount} {symbol} available</div>
            <div>
                <input className="w-100 p-2 my-2" type="number" value={inputAmount || ""} min="0" onChange={(e) => setInputAmount(e.currentTarget.value)} />
                <button className="btn btn-secondary btn-sm max-btn" onClick={onMax}>MAX</button>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-light border col-6 mr-1" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary border col-6 ml-1" onClick={onConfirm}>
                    Confirm
            </button>
            </div>
        </Modal.Body>
    </Modal>);
}

export default StakeModal;