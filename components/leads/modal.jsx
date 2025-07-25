"use client"

import { Modal, Button } from "react-bootstrap"

export default function LeadModal({ showModal, setShowModal }) {
  let modalBody = (
    <Modal.Body style={{ padding: 20 }} className="text-center">
      <h5>Something went wrong!</h5>
      <p>Please reload the page and try again!</p>
    </Modal.Body>
  )
  if (showModal == "success") {
    modalBody = (
      <Modal.Body style={{ padding: 20 }} className="text-center">
        <h5>Thank you for your interest!</h5>
        <p>
          We've received your details and a representative will be in touch with
          you shortly to discuss this property.
        </p>
      </Modal.Body>
    )
  }

  return (
    <Modal show={showModal} centered>
      {modalBody}
      <Modal.Footer
        style={{ border: 0, display: "flex", justifyContent: "center" }}
      >
        <Button onClick={() => setShowModal(null)}>Got It</Button>
      </Modal.Footer>
    </Modal>
  )
}
