"use client"

import { Container, Row, Col } from "react-bootstrap"

import UsersList from "components/users/list"

export default function Listings() {
  return (
    <Container fluid style={{ maxWidth: 1400 }}>
      <Row>
        <Col xs={12}>
          <UsersList />
        </Col>
      </Row>
    </Container>
  )
}
