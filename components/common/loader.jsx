"use client"

import { Container, Row, Col, Spinner } from "react-bootstrap"

export default function Loader() {
  return (
    <Container fluid>
      <Row style={{ padding: 30 }}>
        <Col xs={12} className="text-center">
          <Spinner variant="primary" />
        </Col>
      </Row>
    </Container>
  )
}
