"use client"

import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import store from "store"

export default function Dashboard() {
  const user = store.get("user:agent")

  return (
    <Container fluid style={{ maxWidth: 1400 }}>
      <Row>
        <Col xs={12}>
          <h5>Dashboard</h5>
        </Col>

        <Col xs={12}>
          <a
            target="_blank"
            href={`/lead?agent=${user && user._id.toString()}`}
          >
            <h5>Referral Link</h5>
          </a>
        </Col>
      </Row>
    </Container>
  )
}
