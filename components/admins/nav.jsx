"use client"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

export default function AgentNav() {
  return (
    <Navbar
      className="bg-body-tertiary"
      fixed="top"
      style={{ marginLeft: 10, marginRight: 10 }}
    >
      <Container
        style={{
          maxWidth: 1400,
          border: "1px solid grey",
          borderRadius: 18,
          marginTop: 10,
        }}
      >
        <Nav className="me-auto">
          <Nav.Link href="/admin">Admin</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/logout">Log Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}
