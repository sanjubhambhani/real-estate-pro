"use client"

import { ToastContainer, Toast } from "react-bootstrap"

export default function Notify({ payload }) {
  const { show, hide, message } = payload
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
      <Toast show={show} onClose={hide} autohide delay={3000}>
        <Toast.Header closeButton>{message}</Toast.Header>
      </Toast>
    </ToastContainer>
  )
}
