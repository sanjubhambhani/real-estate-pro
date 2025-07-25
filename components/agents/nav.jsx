"use client"

import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

export default function AgentNav() {
  return (
    <Navbar
      expand="md"
      className="bg-body-tertiary"
      fixed="top"
      style={{
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <Container
        style={{
          maxWidth: 1400,
          border: "1px solid grey",
          borderRadius: 18,
          marginTop: 10,
        }}
      >
        <Navbar.Brand href="/dashboard">RealEstatePro</Navbar.Brand>
        <Navbar.Toggle style={{ border: "0px solid white" }} />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/dashboard/listings">Listings</Nav.Link>
            <Nav.Link href="/dashboard/leads">Leads</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/logout">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
